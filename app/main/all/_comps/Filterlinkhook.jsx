function Filterlinkhook(
  pathname,
  searchParams,
  name,
  value,
  multiple = true // 👈 new flag
) {
  const params = new URLSearchParams(searchParams.toString());

  // Normalize incoming value to array
  const values = Array.isArray(value) ? value : [value];

  // Handle "All"
  if (values.includes("All")) {
    params.delete(name);
    return `${pathname}?${params.toString()}`;
  }

  // 🔹 SINGLE SELECT MODE
  if (!multiple) {
    params.set(name, values[0]);
    return `${pathname}?${params.toString()}`;
  }

  // 🔹 MULTI SELECT MODE (existing logic)
  const current = params.get(name)?.split(",").filter(Boolean) || [];
  let next = [...current];

  values.forEach((v) => {
    if (next.includes(v)) {
      next = next.filter((x) => x !== v);
    } else {
      next.push(v);
    }
  });

  if (next.length) {
    params.set(name, next.join(","));
  } else {
    params.delete(name);
  }

  return `${pathname}?${params.toString()}`;
}

export default Filterlinkhook;
