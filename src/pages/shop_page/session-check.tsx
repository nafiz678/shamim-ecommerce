import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabase-client";

export default function SessionTimer() {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: number | undefined ;

    const startTimer = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (!session?.expires_at) return;

      const updateRemainingTime = () => {
        const currentTime = Math.floor(Date.now() / 1000);

        const remaining = session.expires_at! - currentTime;

        setRemainingTime(remaining > 0 ? remaining : 0);
      };

      updateRemainingTime();

      interval = setInterval(updateRemainingTime, 1000);
    };

    startTimer();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isExpiringSoon = remainingTime !== null && remainingTime <= 600;

  return (
    <div className="fixed bottom-5 right-5 z-9999">
      <div
        className={`rounded-xl border px-4 py-3 shadow-xl backdrop-blur-md transition-all duration-300 ${
          isExpiringSoon
            ? "border-red-500 bg-red-500/10 text-red-500"
            : "border-border bg-background/80 text-foreground"
        }`}
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium opacity-70">Session Remaining</p>

          <h2 className="text-lg font-bold tabular-nums">
            {remainingTime !== null ? formatTime(remainingTime) : "--:--:--"}
          </h2>

          {isExpiringSoon && (
            <p className="text-xs font-medium">Expiring soon</p>
          )}
        </div>
      </div>
    </div>
  );
}
