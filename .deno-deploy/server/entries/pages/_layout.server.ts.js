const load = ({ cookies }) => {
  return {
    theme: cookies.get("theme") ?? null
  };
};
export {
  load
};
