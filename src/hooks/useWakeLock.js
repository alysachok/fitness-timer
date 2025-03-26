import { useEffect, useRef } from "react";

export default function useWakeLock(shouldActivate = true) {
  const wakeLockRef = useRef(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator && shouldActivate) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
          console.log("Wake Lock acquired");

          wakeLockRef.current.addEventListener("release", () => {
            console.log("Wake Lock released");
          });
        }
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };

    requestWakeLock();

    const handleVisibilityChange = async () => {
      if (
        shouldActivate &&
        wakeLockRef.current === null &&
        document.visibilityState === "visible"
      ) {
        await requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log("Wake Lock released on cleanup");
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shouldActivate]);
}
