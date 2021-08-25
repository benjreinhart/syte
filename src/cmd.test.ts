import rewire from "rewire"
const cmd = rewire("./cmd")
const urlPathJoin = cmd.__get__("urlPathJoin")
const constructUrlPath = cmd.__get__("constructUrlPath")
const isMarkdown = cmd.__get__("isMarkdown")
const isAppYaml = cmd.__get__("isAppYaml")
const isLayout = cmd.__get__("isLayout")
const isPage = cmd.__get__("isPage")
const constructLayout = cmd.__get__("constructLayout")
const constructPage = cmd.__get__("constructPage")
const readApp = cmd.__get__("readApp")
const readLayout = cmd.__get__("readLayout")
const readPage = cmd.__get__("readPage")
const readAllLayouts = cmd.__get__("readAllLayouts")
const readAllPages = cmd.__get__("readAllPages")
const renderPage = cmd.__get__("renderPage")
// @ponicode
describe("urlPathJoin", () => {
    test("0", () => {
        let callFunction: any = () => {
            urlPathJoin(["path/to/file.ext"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            urlPathJoin(["C:\\\\path\\to\\file.ext", "."])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            urlPathJoin(["path/to/file.ext", "/path/to/file", "/path/to/file", "/path/to/file"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            urlPathJoin([".", "./path/to/file"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            urlPathJoin(["C:\\\\path\\to\\file.ext", "./path/to/file", "C:\\\\path\\to\\file.ext"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            urlPathJoin([])
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("constructUrlPath", () => {
    test("0", () => {
        let callFunction: any = () => {
            constructUrlPath("path/to/folder/", "/var/up_pink.stl.atx")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            constructUrlPath(".", "/net/panel.dvi.crd")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            constructUrlPath(".", "/tmp/payment_invoice.ogg.cmc")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            constructUrlPath("C:\\\\path\\to\\file.ext", "/etc/ppp/pre_emptive_manager.efif.bcpio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            constructUrlPath("./path/to/file", "/net/panel.dvi.crd")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            constructUrlPath("", "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isMarkdown", () => {
    test("0", () => {
        let callFunction: any = () => {
            isMarkdown({ urlPath: "http://base.com", context: {}, filePath: "/usr/sbin/tan_district.geo.qxt", contents: "Info.plist" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            isMarkdown({ urlPath: "https://api.telegram.org/bot", context: {}, filePath: "/usr/sbin/tan_district.geo.qxt", contents: "navix377.py" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            isMarkdown({ urlPath: "https://api.telegram.org/", context: {}, filePath: "/tmp/payment_invoice.ogg.cmc", contents: "navix377.py" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            isMarkdown({ urlPath: "https://", context: {}, filePath: "/usr/sbin/tan_district.geo.qxt", contents: "libclang.so" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            isMarkdown({ urlPath: "https://", context: {}, filePath: "/tmp/payment_invoice.ogg.cmc", contents: "/results.html" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            isMarkdown({ urlPath: "", context: {}, filePath: "", contents: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isAppYaml", () => {
    test("0", () => {
        let callFunction: any = () => {
            isAppYaml("C:\\\\path\\to\\file.ext", "/etc/ppp/pre_emptive_manager.efif.bcpio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            isAppYaml(".", "/usr/sbin/tan_district.geo.qxt")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            isAppYaml("C:\\\\path\\to\\folder\\", "/net/panel.dvi.crd")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            isAppYaml("path/to/file.ext", "/net/panel.dvi.crd")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            isAppYaml("C:\\\\path\\to\\file.ext", "/var/up_pink.stl.atx")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            isAppYaml("", "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isLayout", () => {
    test("0", () => {
        let callFunction: any = () => {
            isLayout("path/to/folder/", "/tmp/payment_invoice.ogg.cmc")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            isLayout("C:\\\\path\\to\\folder\\", "/etc/ppp/pre_emptive_manager.efif.bcpio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            isLayout("C:\\\\path\\to\\folder\\", "/var/up_pink.stl.atx")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            isLayout("path/to/folder/", "/var/up_pink.stl.atx")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            isLayout("C:\\\\path\\to\\file.ext", "/usr/sbin/tan_district.geo.qxt")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            isLayout("", "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isPage", () => {
    test("0", () => {
        let callFunction: any = () => {
            isPage("path/to/folder/", "/net/panel.dvi.crd")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            isPage(".", "/tmp/payment_invoice.ogg.cmc")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            isPage("C:\\\\path\\to\\file.ext", "/var/up_pink.stl.atx")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            isPage("path/to/folder/", "/var/up_pink.stl.atx")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            isPage("C:\\\\path\\to\\file.ext", "/etc/ppp/pre_emptive_manager.efif.bcpio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            isPage("", "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("constructLayout", () => {
    test("0", () => {
        let callFunction: any = () => {
            constructLayout("/path/to/file", { filePath: "/var/up_pink.stl.atx", contents: "InfoPlist.strings" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            constructLayout("C:\\\\path\\to\\file.ext", { filePath: "/var/up_pink.stl.atx", contents: "libclang.so" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            constructLayout("/path/to/file", { filePath: "/net/panel.dvi.crd", contents: "navix376.py" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            constructLayout("path/to/folder/", { filePath: "/usr/sbin/tan_district.geo.qxt", contents: "libclang.so" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            constructLayout(".", { filePath: "/tmp/payment_invoice.ogg.cmc", contents: "navix377.py" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            constructLayout("", { filePath: "", contents: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("constructPage", () => {
    test("0", () => {
        let callFunction: any = () => {
            constructPage("C:\\\\path\\to\\folder\\", { filePath: "/tmp/payment_invoice.ogg.cmc", contents: "/results.html" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            constructPage("/path/to/file", { filePath: "/var/up_pink.stl.atx", contents: "libclang.so" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            constructPage("path/to/file.ext", { filePath: "/var/up_pink.stl.atx", contents: ":" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            constructPage("./path/to/file", { filePath: "/net/panel.dvi.crd", contents: "libclang.so" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            constructPage(".", { filePath: "/etc/ppp/pre_emptive_manager.efif.bcpio", contents: "InfoPlist.strings" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            constructPage("", { filePath: "", contents: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("readApp", () => {
    test("0", async () => {
        await readApp("/etc/ppp/pre_emptive_manager.efif.bcpio")
    })

    test("1", async () => {
        await readApp("/tmp/payment_invoice.ogg.cmc")
    })

    test("2", async () => {
        await readApp("/net/panel.dvi.crd")
    })

    test("3", async () => {
        await readApp("/var/up_pink.stl.atx")
    })

    test("4", async () => {
        await readApp("/usr/sbin/tan_district.geo.qxt")
    })

    test("5", async () => {
        await readApp("")
    })
})

// @ponicode
describe("readLayout", () => {
    test("0", async () => {
        await readLayout("path/to/folder/", "/var/up_pink.stl.atx")
    })

    test("1", async () => {
        await readLayout("C:\\\\path\\to\\folder\\", "/etc/ppp/pre_emptive_manager.efif.bcpio")
    })

    test("2", async () => {
        await readLayout("path/to/file.ext", "/net/panel.dvi.crd")
    })

    test("3", async () => {
        await readLayout("/path/to/file", "/etc/ppp/pre_emptive_manager.efif.bcpio")
    })

    test("4", async () => {
        await readLayout("/path/to/file", "/var/up_pink.stl.atx")
    })

    test("5", async () => {
        await readLayout("", "")
    })
})

// @ponicode
describe("readPage", () => {
    test("0", async () => {
        await readPage("path/to/file.ext", "/usr/sbin/tan_district.geo.qxt")
    })

    test("1", async () => {
        await readPage("path/to/file.ext", "/var/up_pink.stl.atx")
    })

    test("2", async () => {
        await readPage("C:\\\\path\\to\\file.ext", "/var/up_pink.stl.atx")
    })

    test("3", async () => {
        await readPage("path/to/folder/", "/usr/sbin/tan_district.geo.qxt")
    })

    test("4", async () => {
        await readPage("path/to/folder/", "/tmp/payment_invoice.ogg.cmc")
    })

    test("5", async () => {
        await readPage("", "")
    })
})

// @ponicode
describe("readAllLayouts", () => {
    test("0", async () => {
        await readAllLayouts(".", ["Jean-Philippe", "Michael", "Edmond"])
    })

    test("1", async () => {
        await readAllLayouts("path/to/file.ext", ["Anas", "Jean-Philippe", "Pierre Edouard", "Edmond"])
    })

    test("2", async () => {
        await readAllLayouts("/path/to/file", ["Michael", "Jean-Philippe"])
    })

    test("3", async () => {
        await readAllLayouts("C:\\\\path\\to\\file.ext", ["Edmond", "Jean-Philippe"])
    })

    test("4", async () => {
        await readAllLayouts("C:\\\\path\\to\\file.ext", ["Anas", "Pierre Edouard", "Edmond", "Jean-Philippe"])
    })

    test("5", async () => {
        await readAllLayouts("", [])
    })
})

// @ponicode
describe("readAllPages", () => {
    test("0", async () => {
        await readAllPages("./path/to/file", ["./path/to/file", "C:\\\\path\\to\\file.ext", "./path/to/file", "path/to/folder/", "path/to/file.ext"])
    })

    test("1", async () => {
        await readAllPages("path/to/file.ext", ["path/to/folder/"])
    })

    test("2", async () => {
        await readAllPages("C:\\\\path\\to\\file.ext", ["path/to/folder/", "path/to/folder/", "/path/to/file", "path/to/folder/", "path/to/folder/"])
    })

    test("3", async () => {
        await readAllPages("./path/to/file", ["./path/to/file", "./path/to/file"])
    })

    test("4", async () => {
        await readAllPages("path/to/file.ext", ["./path/to/file"])
    })

    test("5", async () => {
        await readAllPages("", [])
    })
})

// @ponicode
describe("renderPage", () => {
    test("0", () => {
        let param3: any = [{ name: "Michael", filePath: "/tmp/payment_invoice.ogg.cmc", contents: "Info.plist" }]
        let param4: any = [{ urlPath: "http://www.example.com/route/123?foo=bar", context: {}, filePath: "/etc/ppp/pre_emptive_manager.efif.bcpio", contents: "./data/population.csv" }, { urlPath: "https://twitter.com/path?abc", context: {}, filePath: "/var/up_pink.stl.atx", contents: "libclang.dll" }]
        let callFunction: any = () => {
            renderPage({ urlPath: "http://www.example.com/route/123?foo=bar", context: {}, filePath: "/etc/ppp/pre_emptive_manager.efif.bcpio", contents: "navix376.py" }, {}, param3, param4, { urlPathPrefix: "C:\\\\path\\to\\folder\\" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param3: any = [{ name: "Pierre Edouard", filePath: "/usr/sbin/tan_district.geo.qxt", contents: "navix376.py" }, { name: "Pierre Edouard", filePath: "/net/panel.dvi.crd", contents: ":" }, { name: "George", filePath: "/var/up_pink.stl.atx", contents: "navix376.py" }, { name: "Jean-Philippe", filePath: "/etc/ppp/pre_emptive_manager.efif.bcpio", contents: "libclang.dylib" }, { name: "Edmond", filePath: "/etc/ppp/pre_emptive_manager.efif.bcpio", contents: "libclang.so" }]
        let param4: any = [{ urlPath: "http://www.example.com/route/123?foo=bar", context: {}, filePath: "/net/panel.dvi.crd", contents: "./data/population.csv" }, { urlPath: "https://api.telegram.org/bot", context: {}, filePath: "/var/up_pink.stl.atx", contents: "libclang.so" }, { urlPath: "http://www.example.com/route/123?foo=bar", context: {}, filePath: "/var/up_pink.stl.atx", contents: "libclang.dylib" }, { urlPath: "ponicode.com", context: {}, filePath: "/net/panel.dvi.crd", contents: "libclang.so" }]
        let callFunction: any = () => {
            renderPage({ urlPath: "https://accounts.google.com/o/oauth2/revoke?token=%s", context: {}, filePath: "/usr/sbin/tan_district.geo.qxt", contents: "navix376.py" }, {}, param3, param4, { urlPathPrefix: "./path/to/file" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param3: any = [{ name: "George", filePath: "/tmp/payment_invoice.ogg.cmc", contents: "libclang.so" }, { name: "Jean-Philippe", filePath: "/etc/ppp/pre_emptive_manager.efif.bcpio", contents: "navix376.py" }, { name: "Anas", filePath: "/var/up_pink.stl.atx", contents: "InfoPlist.strings" }, { name: "Edmond", filePath: "/tmp/payment_invoice.ogg.cmc", contents: "Info.plist" }, { name: "Jean-Philippe", filePath: "/var/up_pink.stl.atx", contents: "libclang.dylib" }]
        let param4: any = [{ urlPath: "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", context: {}, filePath: "/etc/ppp/pre_emptive_manager.efif.bcpio", contents: ":" }, { urlPath: "http://base.com", context: {}, filePath: "/tmp/payment_invoice.ogg.cmc", contents: "decoder.cc" }, { urlPath: "http://base.com", context: {}, filePath: "/usr/sbin/tan_district.geo.qxt", contents: "navix376.py" }, { urlPath: "https://accounts.google.com/o/oauth2/revoke?token=%s", context: {}, filePath: "/var/up_pink.stl.atx", contents: "navix376.py" }]
        let callFunction: any = () => {
            renderPage({ urlPath: "http://base.com", context: {}, filePath: "/var/up_pink.stl.atx", contents: "navix376.py" }, {}, param3, param4, { urlPathPrefix: "path/to/file.ext" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param3: any = [{ name: "Edmond", filePath: "/usr/sbin/tan_district.geo.qxt", contents: "InfoPlist.strings" }]
        let param4: any = [{ urlPath: "https://croplands.org/app/a/confirm?t=", context: {}, filePath: "/net/panel.dvi.crd", contents: "decoder.hh" }, { urlPath: "Www.GooGle.com", context: {}, filePath: "/usr/sbin/tan_district.geo.qxt", contents: "/results.html" }]
        let callFunction: any = () => {
            renderPage({ urlPath: "https://api.telegram.org/bot", context: {}, filePath: "/tmp/payment_invoice.ogg.cmc", contents: "Info.plist" }, {}, param3, param4, { urlPathPrefix: "path/to/folder/" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param3: any = [{ name: "Edmond", filePath: "/var/up_pink.stl.atx", contents: "Info.plist" }, { name: "Pierre Edouard", filePath: "/usr/sbin/tan_district.geo.qxt", contents: "libclang.dll" }, { name: "Pierre Edouard", filePath: "/net/panel.dvi.crd", contents: "libclang.dylib" }, { name: "Anas", filePath: "/var/up_pink.stl.atx", contents: ":" }, { name: "Pierre Edouard", filePath: "/tmp/payment_invoice.ogg.cmc", contents: "libclang.dylib" }]
        let param4: any = [{ urlPath: "https://api.telegram.org/bot", context: {}, filePath: "/tmp/payment_invoice.ogg.cmc", contents: ":" }, { urlPath: "https://accounts.google.com/o/oauth2/revoke?token=%s", context: {}, filePath: "/net/panel.dvi.crd", contents: "Info.plist" }, { urlPath: "https://accounts.google.com/o/oauth2/revoke?token=%s", context: {}, filePath: "/etc/ppp/pre_emptive_manager.efif.bcpio", contents: "decoder.hh" }, { urlPath: "http://www.croplands.org/account/confirm?t=", context: {}, filePath: "/usr/sbin/tan_district.geo.qxt", contents: "libclang.dylib" }, { urlPath: "http://www.example.com/route/123?foo=bar", context: {}, filePath: "/usr/sbin/tan_district.geo.qxt", contents: "decoder.hh" }]
        let callFunction: any = () => {
            renderPage({ urlPath: "https://api.telegram.org/", context: {}, filePath: "/net/panel.dvi.crd", contents: "navix376.py" }, {}, param3, param4, { urlPathPrefix: "/path/to/file" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            renderPage({ urlPath: "", context: {}, filePath: "", contents: "" }, {}, [], [], { urlPathPrefix: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("cmd.default.new", () => {
    test("0", async () => {
        await cmd.default.new({ path: "C:\\\\path\\to\\folder\\" })
    })

    test("1", async () => {
        await cmd.default.new({ path: "path/to/folder/" })
    })

    test("2", async () => {
        await cmd.default.new({ path: "." })
    })

    test("3", async () => {
        await cmd.default.new({ path: "path/to/file.ext" })
    })

    test("4", async () => {
        await cmd.default.new({ path: "/path/to/file" })
    })

    test("5", async () => {
        await cmd.default.new({ path: "" })
    })
})

// @ponicode
describe("cmd.default.serve", () => {
    test("0", async () => {
        await cmd.default.serve({ path: "path/to/file.ext", port: 587 })
    })

    test("1", async () => {
        await cmd.default.serve({ path: ".", port: 457 })
    })

    test("2", async () => {
        await cmd.default.serve({ path: "path/to/folder/", port: 587 })
    })

    test("3", async () => {
        await cmd.default.serve({ path: "path/to/folder/", port: 457 })
    })

    test("4", async () => {
        await cmd.default.serve({ path: "C:\\\\path\\to\\folder\\", port: 3000 })
    })

    test("5", async () => {
        await cmd.default.serve({ path: "", port: Infinity })
    })
})

// @ponicode
describe("cmd.default.build", () => {
    test("0", async () => {
        await cmd.default.build({ path: "./path/to/file", outputPath: "/PDFData/rothfuss/data/UCF101/prepared_videos", urlPathPrefix: "./path/to/file" })
    })

    test("1", async () => {
        await cmd.default.build({ path: "C:\\\\path\\to\\file.ext", outputPath: "/PDFData/rothfuss/data/UCF101/prepared_videos", urlPathPrefix: "." })
    })

    test("2", async () => {
        await cmd.default.build({ path: "/path/to/file", outputPath: "/PDFData/rothfuss/data/UCF101/prepared_videos", urlPathPrefix: "C:\\\\path\\to\\file.ext" })
    })

    test("3", async () => {
        await cmd.default.build({ path: "C:\\\\path\\to\\folder\\", outputPath: "/PDFData/rothfuss/data/UCF101/prepared_videos", urlPathPrefix: "path/to/file.ext" })
    })

    test("4", async () => {
        await cmd.default.build({ path: "path/to/file.ext", outputPath: "/PDFData/rothfuss/data/UCF101/prepared_videos", urlPathPrefix: "path/to/file.ext" })
    })

    test("5", async () => {
        await cmd.default.build({ path: "", outputPath: "", urlPathPrefix: "" })
    })
})
