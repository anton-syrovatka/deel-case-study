export default function get<T>(
  url: string,
  controller?: AbortController
): Promise<T> {
  const options = controller && { signal: controller.signal };

  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}
