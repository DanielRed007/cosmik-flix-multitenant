import { useRouter } from 'next/navigation';

export function useRedirect () {

    const router = useRouter();

    const redirectRoute = (route: string) => {
        router.push(route);
    }

    return {
        redirectRoute
    }
}