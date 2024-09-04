'use client';
import { Input } from '@/components/ui/input';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const Search = ({ query }) => {
  const searchParams = useSearchParams();
  const pahtname = usePathname();
  const router = useRouter();

  const handleInput = useDebouncedCallback((e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }
    router.replace(`${pahtname}?${params.toString()}`);

    console.log(value);
  }, 200);

  return (
    <div>
      <Input
        onChange={handleInput}
        defaultValue={searchParams.get(`${query}`)?.toString()}
        type="text"
        placeholder="Search by lastname"
      />
    </div>
  );
};
