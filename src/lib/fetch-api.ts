export class FetchApi {
  public GetFetch<T>(path: string, token?: string): Promise<never | T> {
    const headers: { "Content-Type": string; Authorization?: string } = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const params = {
      method: "GET",
      headers: headers,
    };
    return fetch(path, params).then((res) => res.json());
  }

  public PostFetch<T>(path: string, data: T) {
    return fetch(path, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("err | ", err);
      });
  }

  public PutFetch<T>(path: string, data: T) {
    return fetch(path, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("err | ", err);
      });
  }

  public DeleteFetch(path: string, id: number) {
    return fetch(path, {
      method: "DELETE",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("err | ", err);
      });
  }
}
