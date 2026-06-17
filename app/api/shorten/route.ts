import { createSupabaseClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { nanoid } from "nanoid";
import { auth } from '@clerk/nextjs/server';

export async function POST(request : NextRequest) {
    const {url} = await request.json()
    const {userId} = await auth()
    const shortCode = nanoid(7);

    const supabase = await createSupabaseClient()

    const { data, error } = await supabase.from('url').insert({
        created_at : new Date().toISOString(),
        short_url : shortCode,
        original_url : url,
        status: "live",
        click_count :0,
        user_id : userId
    }).select().single()

    if (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}