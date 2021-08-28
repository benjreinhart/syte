import * as utils from "./utils"
// @ponicode
describe("utils.isBlank", () => {
    test("0", () => {
        let callFunction: any = () => {
            utils.isBlank("user1+user2@mycompany.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            utils.isBlank("ponicode.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            utils.isBlank("TestUpperCase@Example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            utils.isBlank("bed-free@tutanota.de")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            utils.isBlank("something.example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            utils.isBlank("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("utils.isString", () => {
    test("0", () => {
        let callFunction: any = () => {
            utils.isString(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            utils.isString("user@host:300")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            utils.isString(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            utils.isString("something.example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            utils.isString("something@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            utils.isString(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("utils.isObject", () => {
    test("0", () => {
        let callFunction: any = () => {
            utils.isObject(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            utils.isObject("something@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            utils.isObject("TestUpperCase@Example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            utils.isObject("email@Google.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            utils.isObject("something.example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            utils.isObject(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("utils.loadYamlObject", () => {
    test("0", () => {
        let callFunction: any = () => {
            utils.loadYamlObject("navix377.py")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            utils.loadYamlObject("libclang.so")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            utils.loadYamlObject("libclang.dll")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            utils.loadYamlObject("decoder.cc")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            utils.loadYamlObject("InfoPlist.strings")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            utils.loadYamlObject("")
        }
    
        expect(callFunction).not.toThrow()
    })
})
