import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const User = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
  }

  console.log(data);

  return <div></div>;
};

export default User;
