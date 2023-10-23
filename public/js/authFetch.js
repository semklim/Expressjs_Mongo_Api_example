export default async function loginAndReg(url, body) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message, { cause: err });
    }
    return res.json();
  } catch (e) {
    console.log(e);
    return e;
  }
};