const convert = document.getElementById("convert");
const codeToCopy = document.getElementById("codeToCopy");
const copyButton = document.getElementById("copyButton");
const reset = document.getElementById("reset");

convert.addEventListener("click", function () {
  const driveUrl = document.getElementById("driveUrl").value;

  if (driveUrl != "") {
    let arrList = driveUrl
      .split(";")
      .filter((text) => !text.includes(":") && text)
      .map((text) => {
        return text.split(" ")[1] ? text.split(" ")[1] : text;
      });

    let putText = arrList.findIndex((el) => el === "PUT");
    let callText = arrList.findIndex((el) => el === "CALL");

    if (putText !== -1) {
      arrList.splice(putText, 1);
    }

    if (callText !== -1) {
      arrList.splice(callText, 1);
    }

    if ([...new Set([...arrList])].length !== 0) {
      codeToCopy.innerHTML = [...new Set([...arrList])].join(", ");

      this.classList.toggle("hidden");
      copyButton.classList.toggle("hidden");
    }
  } else {
    runToastify("Input field is empty");
  }
});

document.getElementById("copyButton").addEventListener("click", function () {
  copyToClipboard(document.getElementById("codeToCopy").innerText);

  this.classList.toggle("hidden");
  convert.classList.toggle("hidden");
});

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  runToastify();
}

function runToastify(message) {
  Toastify({
    text: message ? message : "Your Unique Currency is Copied",
    duration: 1200,
    newWindow: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {},
  }).showToast();
}

reset.addEventListener("click", function () {
  const allClassConvert = Array.from(convert.classList);
  const allClassCopyButton = Array.from(copyButton.classList);

  if (allClassConvert.includes("hidden")) {
    convert.classList.remove("hidden");
  }

  if (!allClassCopyButton.includes("hidden")) {
    copyButton.classList.add("hidden");
  }

  document.getElementById("driveUrl").value = "";
  codeToCopy.innerHTML = "// Your URL code goes here";
});
