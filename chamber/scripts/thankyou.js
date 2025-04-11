const params = new URLSearchParams(window.location.search);

const fields = {
    "First Name": params.get("firstName"),
    "Last Name": params.get("lastName"),
    "Email": params.get("email"),
    "Mobile Number": params.get("mobile"),
    "Business Name": params.get("organization"),
    "Submitted":  new Date(params.get("timestamp")).toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
        hour12: true
    })
};

const dl = document.getElementById("formData");

for (const [label, value] of Object.entries(fields)) {
    if (value) {
        const dt = document.createElement("dt");
        dt.textContent = label;
        const dd = document.createElement("dd");
        dd.textContent = value;
        dl.appendChild(dt);
        dl.appendChild(dd);
    }
}