import { useEffect, type ReactNode } from 'react';

import { supabaseClient } from '../../lib/supabase-client';
import { clearAuth, setAuth, setAuthLoading } from './auth-slice';
import { useAppDispatch } from '../../store/hooks';
import { queryClient } from '../../main';

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      dispatch(setAuthLoading(true));

      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (!mounted) return;

      if (!session?.user) {
        dispatch(clearAuth());
        return;
      }

      dispatch(
        setAuth({
          user: {
            id: session.user.id,
            email: session.user.email ?? null,
            fullName:
              typeof session.user.user_metadata?.full_name === 'string'
                ? session.user.user_metadata.full_name
                : null,
          },
          accessToken: session.access_token,
        }),
      );
    }

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        dispatch(clearAuth());
        queryClient.clear();
        return;
      }

      dispatch(
        setAuth({
          user: {
            id: session.user.id,
            email: session.user.email ?? null,
            fullName:
              typeof session.user.user_metadata?.full_name === 'string'
                ? session.user.user_metadata.full_name
                : null,
          },
          accessToken: session.access_token,
        }),
      );
    });

    loadSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return children;
}
