import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
const contactSchema = z.object({ name:z.string().trim().min(2).max(100),email:z.string().trim().email().max(254),subject:z.string().trim().min(3).max(150),message:z.string().trim().min(10).max(5000),website:z.string().max(200).optional() });
export const sendContactMessage = createServerFn({method:'POST'})
 .inputValidator((data:unknown)=>contactSchema.parse(data))
 .handler(async ({data})=>{
  if(data.website) return {success:true};
  const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
  const {count,error:lookupError}=await supabaseAdmin.from('contact_messages').select('id',{count:'exact',head:true}).eq('email',data.email.toLowerCase()).gte('created_at',new Date(Date.now()-3600000).toISOString());
  if(lookupError) throw new Error('Messages are temporarily unavailable. Please use the email link.');
  if((count??0)>=3) throw new Error('You have sent several messages. Please try again in an hour.');
  const {error}=await supabaseAdmin.from('contact_messages').insert({name:data.name,email:data.email.toLowerCase(),subject:data.subject,message:data.message});
  if(error) throw new Error('Your message could not be saved. Please try again or use the email link.');
  return {success:true};
 });
