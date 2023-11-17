export default function checkIfTokenExists() {
  document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      window.location.href = "/";
    }
    const response = await fetch("/valida/token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status != 200) {
          // window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/";
      });

    //   const response = await fetch("/user", {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    const data = await response.json();

    if (response.ok) {
      console.log("Ok");
      // localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      alert(data.msg);
      window.location.href = "/";
    }
  });
}
