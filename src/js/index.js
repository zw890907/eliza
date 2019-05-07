require(["config"],() => {
    require(["header","footer"],(header,footer) => {
        console.log(header);
        console.log(footer);
    })
})