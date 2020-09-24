let Navbar = {
    render: async () => {
        let view = /*html*/`
        <a href = "/#/interviews"> All Interviews</a>
        <a href = "/#/users"> All Users</a>
        `
        return view
    },
    after_render: async () => { }
}

export default Navbar;