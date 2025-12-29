
function Filterlinkhook(pathname,searchParams,name, value) {
 

  const params = new URLSearchParams(searchParams.toString());

  // Normalize incoming value to array
  const values = Array.isArray(value) ? value : [value];

  // Current values from URL
  const current = params.get(name)?.split(",").filter(Boolean) || [];

  // Handle "All"
  if (values.includes("All")) {
    params.delete(name);
    return `${pathname}?${params.toString()}`;
  }

  let next = [...current];

  values.forEach((v) => {
    if (next.includes(v)) {
      // Toggle off
      next = next.filter((x) => x !== v);
    } else {
      // Add
      next.push(v);
    }
  });

  // Set or delete param
  if (next.length) {
    params.set(name, next.join(","));
  } else {
    params.delete(name);
  }

  return `${pathname}?${params.toString()}`;
}

export default Filterlinkhook;
