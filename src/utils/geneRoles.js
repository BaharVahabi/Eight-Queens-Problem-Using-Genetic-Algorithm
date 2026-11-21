export function getSwapRoles(genes, swap) {
  return genes.map((_, index) =>
    swap && swap.includes(index) ? "swap" : "default"
  );
}