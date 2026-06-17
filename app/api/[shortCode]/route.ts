import { createSupabaseClient } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest){
    const supabase = await createSupabaseClient();
    const code = request.nextUrl.pathname.split("/")[2]
    const basepath = request.nextUrl.origin
    if(!code){
        return NextResponse.json({message:"Short code is required"}, {status: 400})
    }
    
    const {data:getOriginalURL,error:getOriginalURLError} = await supabase.from("url").select("original_url,click_count").eq("short_url",code).single()

    if(getOriginalURLError || !getOriginalURL){
        return NextResponse.json({message:"Url not found"}, {status: 404})
    }
    const {data:updateClickCount, error:updateClickCountError} = await supabase.from("url").update({click_count: (getOriginalURL.click_count || 0) + 1}).eq("short_url",code).select()

    if(updateClickCountError){
        return NextResponse.json({message:"Internal server error"}, {status: 500})
    }

    return NextResponse.redirect(getOriginalURL.original_url)
    
}