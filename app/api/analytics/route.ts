import { NextRequest, NextResponse } from "next/server";

import { auth } from '@clerk/nextjs/server';
import { createSupabaseClient } from "@/utils/supabase/client";

export async function GET(request: NextRequest) {
    
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const supabase = await createSupabaseClient()
        const { data, error } = await supabase
            .from('url')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.log(error)
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}