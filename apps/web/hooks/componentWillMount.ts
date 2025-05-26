import React from 'react';

export default function useComponentWillMount(callback : () => void) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    if (!hasMounted) {
      callback();
      setHasMounted(true);
    }
  }, [callback, hasMounted]);
}