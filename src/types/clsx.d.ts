declare module 'clsx' {
  type ClassValue = string | number | ClassValue[] | { [key: string]: any } | false | null | undefined;
  export default function clsx(...inputs: ClassValue[]): string;
  export function clsx(...inputs: ClassValue[]): string;
} 