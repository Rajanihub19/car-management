const serverUrl = "https://6350182bdf22c2af7b631c8d.mockapi.io/api";
export const getRequest = async (endPoint, options = {}) => {
  try {
    const response = await fetch(serverUrl + endPoint, options);
    if (response.ok) {
      const data = await response.json();
      return { status: 200, data };
    }
    return { status: 400, err: "Something went wrong" };
  } catch (err) {
    return { status: 400, err };
  }
};
export const putRequest = async (
  endPoint,
  data,
  options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }
) => {
  try {
    const response = await fetch(serverUrl + endPoint, options);
    if (response.ok) {
      const data = await response.json();
      console.log("datatatatat => ", data);
      return { status: 200, data };
    }
    return { status: 400, err: "Something went wrong" };
  } catch (err) {
    return { status: 400, err };
  }
};

export const postRequest = async (
  endPoint,
  data,
  options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }
) => {
  try {
    const response = await fetch(serverUrl + endPoint, options);
    if (response.ok) {
      const data = await response.json();
      console.log("datatatatat => ", data);
      return { status: 200, data };
    }
    return { status: 400, err: "Something went wrong" };
  } catch (err) {
    return { status: 400, err };
  }
};
