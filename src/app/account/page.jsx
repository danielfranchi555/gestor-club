import { createSupabaseServerClient } from '@/utils/supabase/server';

const page = async () => {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log({ datafromaccount: user });

  return <div>emailUser: {user.email}</div>;
};

export default page;
