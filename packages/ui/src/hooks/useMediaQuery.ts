import React from "react";

/**
 * Custom hook to check if the media query is matched
 *
 * Only works on client side
 *
 * @param mediaQuery: string - The media query to be used Ex: (min-width: 768px)
 * @returns
 */
export default function useCustomMediaQuery(mediaQuery: string) {
  const [matches, setMatches] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);

    if (mediaQueryList.matches !== matches) {
      setMatches(mediaQueryList.matches);
    }

    const handleChangelistener = (event: any) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChangelistener);

    return () => {
      mediaQueryList.removeEventListener("change", handleChangelistener);
    };
  }, [matches, mediaQuery]);

  return matches;
}
