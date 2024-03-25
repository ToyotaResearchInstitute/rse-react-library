export function tidyClassName(className: string) {
  return className.replace(/[\s]+/g, ' ').trim();
}

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}
