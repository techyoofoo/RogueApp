
db = connect("rogue_app");

db.menus.dropIndexes();
db.menus.drop();


db.menus.save(
    [
        {
            id: "login", name: "Log in", state: "Enable", path: "/rouge/usermanagement/user/login", roleId: [
                "5d8b7148a0cf6420a4ed1853", "5d8dd825243342177436d2a3"
            ]
        },
        {
            id: "register", name: "Sign up", state: "Enable", path: "/rouge/usermanagement/user/create", roleId: [
                "5d8b7148a0cf6420a4ed1853", "5d8dd825243342177436d2a3"
            ]
        }
    ]
);
