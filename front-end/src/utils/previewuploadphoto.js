
// Source: http://stackoverflow.com/a/4459419/6396981
choosefilebutton.onchange = evt => {
    const [file] = choosefilebutton.files
    if (file) {
        defaultphoto.classList.add("d-none");
        myphoto.classList.remove("d-none");
        myphoto.src = URL.createObjectURL(file);
    }
}