import Foundation
import CoreGraphics
import CoreText
import ImageIO
import UniformTypeIdentifiers

let W = 1280
let H = 720
let fps = 24
let duration = 53.2
let fontName = "NotoSansArmenian-Regular" as CFString
let boldFontName = "NotoSansArmenian-Bold" as CFString
_ = CTFontManagerRegisterFontsForURL(URL(fileURLWithPath:"/System/Library/Fonts/NotoSansArmenian.ttc") as CFURL,.process,nil)

func color(_ hex: UInt32, _ alpha: CGFloat = 1) -> CGColor {
    let r = CGFloat((hex >> 16) & 255) / 255
    let g = CGFloat((hex >> 8) & 255) / 255
    let b = CGFloat(hex & 255) / 255
    return CGColor(red: r, green: g, blue: b, alpha: alpha)
}
func rect(_ c: CGContext, _ x: CGFloat, _ y: CGFloat, _ w: CGFloat, _ h: CGFloat, _ fill: UInt32, _ radius: CGFloat = 0, _ stroke: UInt32? = nil, _ strokeWidth: CGFloat = 1, _ alpha: CGFloat = 1) {
    let box = CGRect(x: x, y: CGFloat(H) - y - h, width: w, height: h)
    let path = CGMutablePath()
    if radius > 0 { path.addRoundedRect(in: box, cornerWidth: radius, cornerHeight: radius) }
    else { path.addRect(box) }
    c.saveGState()
    c.setAlpha(alpha)
    c.addPath(path)
    c.setFillColor(color(fill, alpha))
    c.fillPath()
    if let stroke { c.addPath(path); c.setStrokeColor(color(stroke, alpha)); c.setLineWidth(strokeWidth); c.strokePath() }
    c.restoreGState()
}
func line(_ c: CGContext, _ x1: CGFloat, _ y1: CGFloat, _ x2: CGFloat, _ y2: CGFloat, _ hex: UInt32, _ width: CGFloat = 1, _ alpha: CGFloat = 1) {
    c.saveGState(); c.setAlpha(alpha); c.setStrokeColor(color(hex, alpha)); c.setLineWidth(width); c.move(to: CGPoint(x: x1, y: CGFloat(H)-y1)); c.addLine(to: CGPoint(x: x2, y: CGFloat(H)-y2)); c.strokePath(); c.restoreGState()
}
func circle(_ c: CGContext, _ x: CGFloat, _ y: CGFloat, _ d: CGFloat, _ fill: UInt32, _ alpha: CGFloat = 1, _ stroke: UInt32? = nil, _ sw: CGFloat = 1) {
    let box = CGRect(x: x, y: CGFloat(H)-y-d, width: d, height: d)
    c.saveGState(); c.setAlpha(alpha); c.setFillColor(color(fill,alpha)); c.fillEllipse(in: box)
    if let stroke { c.setStrokeColor(color(stroke,alpha)); c.setLineWidth(sw); c.strokeEllipse(in: box) }
    c.restoreGState()
}
func font(_ size: CGFloat, _ bold: Bool = false) -> CTFont {
    CTFontCreateWithName(bold ? boldFontName : fontName, size, nil)
}
func lineWidth(_ text: String, _ size: CGFloat, _ bold: Bool = false) -> CGFloat {
    let f = font(size, bold)
    let a = [NSAttributedString.Key(kCTFontAttributeName as String): f]
    let l = CTLineCreateWithAttributedString(NSAttributedString(string: text, attributes: a))
    return CGFloat(CTLineGetTypographicBounds(l, nil, nil, nil))
}
func drawText(_ c: CGContext, _ text: String, _ x: CGFloat, _ top: CGFloat, _ size: CGFloat, _ hex: UInt32, _ bold: Bool = false, _ alpha: CGFloat = 1) {
    let f = font(size,bold)
    let attrs: [NSAttributedString.Key: Any] = [NSAttributedString.Key(kCTFontAttributeName as String): f, NSAttributedString.Key(kCTForegroundColorAttributeName as String): color(hex,alpha)]
    let ln = CTLineCreateWithAttributedString(NSAttributedString(string: text, attributes: attrs))
    let baseline = CGFloat(H) - top - CTFontGetAscent(f)
    c.saveGState(); c.setAlpha(alpha); c.textMatrix = .identity; c.textPosition = CGPoint(x: x, y: baseline); CTLineDraw(ln,c); c.restoreGState()
}
func wrapped(_ text: String, size: CGFloat, maxWidth: CGFloat, bold: Bool = false) -> [String] {
    var result: [String] = []; var current = ""
    for word in text.split(separator: " ").map(String.init) {
        let candidate = current.isEmpty ? word : current + " " + word
        if lineWidth(candidate,size,bold) > maxWidth && !current.isEmpty { result.append(current); current = word }
        else { current = candidate }
    }
    if !current.isEmpty { result.append(current) }
    return result
}
func paragraph(_ c: CGContext, _ text: String, _ x: CGFloat, _ top: CGFloat, _ width: CGFloat, _ size: CGFloat, _ hex: UInt32, _ bold: Bool = false, _ leading: CGFloat = 1.35, _ align: Bool = false, _ alpha: CGFloat = 1) {
    let lines = wrapped(text,size:size,maxWidth:width,bold:bold)
    for (i,s) in lines.enumerated() {
        let w = lineWidth(s,size,bold)
        drawText(c,s,align ? x + max(0,(width-w)/2) : x,top + CGFloat(i)*size*leading,size,hex,bold,alpha)
    }
}
func lerp(_ a: CGFloat,_ b: CGFloat,_ t: CGFloat)->CGFloat { a + (b-a)*max(0,min(1,t)) }
func ease(_ t: CGFloat)->CGFloat { let x=max(0,min(1,t)); return x*x*(3-2*x) }

func card(_ c: CGContext,_ x: CGFloat,_ y: CGFloat,_ w: CGFloat,_ h: CGFloat,_ title: String? = nil) {
    rect(c,x,y,w,h,0xffffff,16,0xeeeaf2,1)
    if let title { drawText(c,title,x+18,y+15,14,0x292438,true) }
}
func badge(_ c: CGContext,_ text:String,_ x:CGFloat,_ y:CGFloat,_ bg:UInt32,_ fg:UInt32,_ size:CGFloat=10) {
    let w = lineWidth(text,size,true)+18
    rect(c,x,y,w,23,bg,11)
    drawText(c,text,x+9,y+6,size,fg,true)
}
func progressBar(_ c: CGContext,_ x:CGFloat,_ y:CGFloat,_ w:CGFloat,_ v:CGFloat,_ hex:UInt32,_ anim:CGFloat=1) {
    rect(c,x,y,w,7,0xf0edf4,4)
    rect(c,x,y,w*max(0,min(1,v*anim)),7,hex,4)
}
func drawLogo(_ c: CGContext,_ x:CGFloat,_ y:CGFloat,_ size:CGFloat) {
    rect(c,x,y,size,size,0x8060df,11)
    rect(c,x+1,y+1,size-2,size/2,0x9a81ee,10,nil,1,0.8)
    drawText(c,"t",x+9,y+2,size*0.74,0xffffff,true)
}
func dotIcon(_ c: CGContext,_ x:CGFloat,_ y:CGFloat,_ hex:UInt32) { circle(c,x,y,8,hex) }

let nav = ["Գլխավոր","Ուսանողներ","Դասընթացներ","Հմտություններ","Նախագծեր","Տաղանդների որոնում","Վերլուծություն"]
let navIcons = ["◉","◌","▣","✦","▧","◎","▥"]
func shell(_ c: CGContext,_ scene:Int,_ relative:CGFloat) {
    // airy, polished workspace base
    rect(c,0,0,CGFloat(W),CGFloat(H),0xf7f6f9)
    // ambient color pools
    let phase=relative*0.45
    circle(c,885+sin(phase)*14,20+cos(phase)*8,280,0x9f82ed,0.045)
    circle(c,1020,420+sin(phase+1)*12,250,0x51a4ef,0.025)
    rect(c,0,0,204,CGFloat(H),0x191720)
    drawLogo(c,18,19,34)
    drawText(c,"Talent Hub",62,22,12,0xffffff,true)
    drawText(c,"Ուսանողների տաղանդների հարթակ",62,41,8,0xb2acbc)
    rect(c,13,75,178,48,0x231f2b,10,0x393444)
    circle(c,23,86,27,0xddd2ff)
    drawText(c,"ԱՀ",29,91,9,0x6346c4,true)
    drawText(c,"Ակադեմիայի ցուցադրություն",59,83,9,0xffffff,true)
    drawText(c,"32 հորինված պրոֆիլ",59,99,8,0xa29cad)
    drawText(c,"ԱՇԽԱՏԱՆՔԱՅԻՆ ՏԱՐԱԾՔ",22,145,8,0x817b89,true)
    for (i,label) in nav.enumerated() {
        let y:CGFloat = 164 + CGFloat(i)*43
        if i==scene-2 { rect(c,10,y,184,36,0x332b43,9) }
        drawText(c,navIcons[i],22,y+8,15,i==scene-2 ? 0xc9b9ff : 0xaaa4b1,true)
        drawText(c,label,47,y+10,11,i==scene-2 ? 0xffffff : 0xc6c1cc,i==scene-2)
        if i==5 { badge(c,"ՆՈՐ",153,y+7,0x473861,0xe0d6ff,8) }
    }
    rect(c,0,0,CGFloat(W),60,0xffffff)
    line(c,204,59,CGFloat(W),59,0xeeeaf2,1)
    drawText(c,"Տաղանդների հանգույց",230,22,10,0x827d8e)
    drawText(c,"/",345,22,10,0xc1bcc7)
    drawText(c,scenePageTitle(scene),362,20,11,0x372f42,true)
    rect(c,755,13,255,34,0xf8f7fa,9,0xeeeaf2)
    drawText(c,"⌕",770,16,20,0x8f8896)
    drawText(c,"Որոնել անուն կամ հմտություն…",796,22,9,0xa29ca8)
    circle(c,1044,24,8,0xffffff,1,0xe2dde8)
    line(c,1051,31,1058,38,0x918a99,1.5)
    circle(c,1110,18,8,0xf07473)
    badge(c,"ԴԵՄՈ",1142,17,0xfff0e7,0xad6436,9)
    drawLogo(c,1209,13,33)
    drawText(c,"Գլխավոր էջ",230,80,24,0x251e30,true)
    drawText(c,"Ֆիկտիվ ուսանողներ · հաշվարկները բխում են դեմո տվյալներից",230,112,10,0x85808e)
    badge(c,"ՑՈՒՑԱԴՐԱԿԱՆ",1058,82,0xf0ebff,0x7658c8,9)
}
func scenePageTitle(_ scene:Int)->String {
    switch scene {
    case 2:return "Ընդհանուր պատկեր"
    case 3:return "Ուսանողներ"
    case 4:return "Ուսանողի պրոֆիլ"
    case 5:return "Դասընթացներ և ճանապարհային քարտեզներ"
    case 6:return "Հմտությունների որոնում"
    case 7:return "Վերլուծություն"
    default:return "Talent Hub"
    }
}
func drawMetrics(_ c: CGContext,_ anim:CGFloat) {
    let xs:[CGFloat]=[230,488,746,1004]
    let items:[(String,String,String,UInt32)] = [("Ուսանողներ","32","18 ակտիվ",0x8161df),("Ուսումնական ուղիներ","8","բոլոր ուղղությունները",0x4089da),("Ավարտված նախագծեր","51","71 ընդհանուր",0x32a77b),("Միջին առաջընթաց","64%","խմբի միջին արժեքը",0xe18e43)]
    for (i,item) in items.enumerated() {
        card(c,xs[i],150,244,95)
        circle(c,xs[i]+18,167,32,[0xf2edff,0xe9f4ff,0xe7f7f0,0xfff2e5][i])
        drawText(c,["◌","▣","✓","↗"][i],xs[i]+26,174,14,item.3,true)
        drawText(c,item.0,xs[i]+60,168,10,0x716b79)
        drawText(c,item.1,xs[i]+18,194,25,0x262131,true)
        drawText(c,item.2,xs[i]+18,225,8,0x928c99)
        progressBar(c,xs[i]+145,228,78,[0.72,0.8,0.71,0.64][i],item.3,anim)
    }
}
func drawDashboard(_ c: CGContext,_ anim:CGFloat) {
    drawMetrics(c,anim)
    card(c,230,263,568,222,"Ուսանողների բաշխումն ըստ դասընթացի")
    drawText(c,"Համեմատեք խմբերի չափն ու առաջընթացը",250,297,9,0x8b8592)
    let labs=["AI","AI DevHack","Հավելվածների մշակում","UX/UI","Գրաֆիկական դիզայն","Ժամանակակից AI","Խաղերի մշակում"]
    let vals:[CGFloat]=[0.75,0.7,0.65,0.62,0.55,0.48,0.45]
    for i in 0..<labs.count {
        let y:CGFloat=326+CGFloat(i)*20
        drawText(c,labs[i],250,y,9,0x5d5866)
        rect(c,370,y+3,300,8,0xf0edf4,4)
        rect(c,370,y+3,300*vals[i]*anim,8,i==0 ? 0x7d5cdb : 0xb8a8ea,4)
        drawText(c,["4","4","4","4","4","4","4"][i],689,y-1,9,0x716b79,true)
    }
    card(c,814,263,434,222,"Ամենատարածված հմտությունները")
    drawText(c,"Ուսանողների պրոֆիլներում գրանցված",834,297,9,0x8b8592)
    let skills=[("Python",0.86),("React",0.69),("Figma",0.58),("Linux",0.53),("SQL",0.47)]
    for (i,s) in skills.enumerated() {
        let y:CGFloat=327+CGFloat(i)*28
        drawText(c,s.0,834,y,10,0x4e4858,true)
        rect(c,918,y+3,235,7,0xf0edf4,4)
        rect(c,918,y+3,235*s.1*anim,7,[0x7c5adc,0x548bd8,0xe69053,0x45a984,0x8b7de4][i],4)
        drawText(c,["18","12","10","9","8"][i],1168,y-1,9,0x716b79,true)
    }
    card(c,230,503,1018,89,"Վերջին ակտիվություն")
    circle(c,251,526,26,0xfff0e1)
    drawText(c,"↗",258,531,13,0xd8893c,true)
    drawText(c,"Մարիամ Պետրոսյանն ավարտել է AI ուսումնական ուղին",290,520,10,0x4e4858,true)
    drawText(c,"Վերջին ավարտական նախագիծ · Armenian Language Chatbot",290,540,8,0x898391)
    badge(c,"ԳՐԱՆՑՎԱԾ",1118,530,0xe8f6ee,0x31815e,8)
}
func drawDirectory(_ c:CGContext,_ anim:CGFloat) {
    card(c,230,150,1018,82)
    rect(c,250,169,267,38,0xf9f8fb,9,0xece8f0)
    drawText(c,"⌕",264,176,20,0x7b6b95)
    drawText(c,"Python",290,180,11,0x51485e,true)
    badge(c,"AI",539,176,0xf0ebff,0x7152c9)
    badge(c,"Միջին+",593,176,0xeef5ff,0x476fc1)
    badge(c,"Ակտիվ",723,176,0xe9f7f1,0x368463)
    rect(c,1084,170,141,37,0x7654d4,10)
    drawText(c,"Զտել",1135,180,10,0xffffff,true)
    drawText(c,"Որոնման արդյունքներ",230,253,15,0x2c2536,true)
    drawText(c,"32 ուսանողից 4-ը համապատասխանում են",230,277,9,0x8a8491)
    let names:[(String,String,String,String,UInt32)]=[("Արամ Սարգսյան","AI · 82%","Python · Մեքենայական ուսուցում","3 նախագիծ",0x8161df),("Մարիամ Պետրոսյան","AI · 100%","Python · Մեքենայական ուսուցում","2 նախագիծ",0x42a580),("Նարեկ Գրիգորյան","AI · 47%","Python · Pandas","2 նախագիծ",0x468cd3),("Էրիկ Վարդանյան","Հավելվածների մշակում · 91%","Python · React","2 նախագիծ",0xe59748)]
    for (i,n) in names.enumerated() {
        let y:CGFloat=299+CGFloat(i)*68
        card(c,230,y,1018,58)
        circle(c,246,y+12,34,[0xece5ff,0xe1f2ff,0xffeddc,0xe0f5eb][i])
        drawText(c,String(n.0.prefix(1)),258,y+20,13,n.4,true)
        drawText(c,n.0,292,y+13,10,0x302a39,true)
        drawText(c,n.1,292,y+32,8,0x8a8491)
        badge(c,n.2,655,y+17,0xf6f3fa,0x62566f,8)
        drawText(c,n.3,1036,y+21,8,0x706a78)
        progressBar(c,1130,y+25,78,i==0 ? 0.82 : i==1 ? 1 : i==2 ? 0.47 : 0.91,n.4,anim)
    }
}
func drawProfile(_ c:CGContext,_ anim:CGFloat) {
    card(c,230,150,1018,137)
    circle(c,252,174,68,0xeee7ff)
    drawText(c,"ԱՍ",266,192,18,0x6a4ec4,true)
    drawText(c,"Արամ Սարգսյան",340,167,19,0x282234,true)
    drawText(c,"AI · Մեքենայական ուսուցում · Ընդունվել է 2025 թ․ փետրվարի 12-ին",340,199,9,0x807987)
    badge(c,"ԱԿՏԻՎ",340,226,0xe8f6ef,0x31815e,8)
    badge(c,"ՄԻՋԻՆ ՓՈՒԼ",409,226,0xf3efff,0x6b54bd,8)
    drawText(c,"82%",1090,176,23,0x7657d4,true)
    drawText(c,"Ուսուցման առաջընթաց",1076,205,8,0x88818e)
    progressBar(c,1067,229,148,0.82,0x7756d5,anim)
    card(c,230,305,500,270,"Տեխնիկական հմտություններ")
    drawText(c,"Ձեռքբերված գիտելիքներն ու նախագծային ապացույցները",250,337,8,0x8a8491)
    let skills:[(String,String,UInt32)]=[("Python","Առաջադեմ",0x7658d1),("Մեքենայական ուսուցում","Միջին",0x3c9c79),("SQL","Միջին",0x3c82c5),("Pandas","Միջին",0x8969d9)]
    for (i,s) in skills.enumerated() {
        let y:CGFloat=365+CGFloat(i)*47
        drawText(c,s.0,250,y,10,0x423c4a,true)
        badge(c,s.1,475,y-3,0xf4f0fa,s.2,8)
        drawText(c,"Ապացույց՝ գործնական առաջադրանք",250,y+18,7,0x98919e)
        if i<3 { line(c,250,y+37,709,y+37,0xf1eef4) }
    }
    card(c,748,305,500,270,"Պորտֆոլիո նախագծեր")
    drawText(c,"3 ավարտված աշխատանք",768,337,8,0x8a8491)
    rect(c,768,360,460,78,0xf7f3ff,12)
    circle(c,784,375,35,0xe8dfff)
    drawText(c,"✦",794,383,16,0x7655d7,true)
    drawText(c,"Հայերեն լեզվով chatbot",832,372,10,0x3d3646,true)
    drawText(c,"Python · NLP · Մեքենայական ուսուցում",832,393,8,0x837a8c)
    badge(c,"88 / 100",1138,377,0xffffff,0x7658d1,8)
    rect(c,768,451,460,78,0xf0f6ff,12)
    circle(c,784,466,35,0xddeaff)
    drawText(c,"◉",793,474,16,0x4286d8,true)
    drawText(c,"Պատկերների օբյեկտների ճանաչում",832,463,9,0x3d3646,true)
    drawText(c,"Python · PyTorch · Computer Vision",832,484,8,0x837a8c)
    badge(c,"91 / 100",1138,468,0xffffff,0x4286d8,8)
}
func drawRoadmap(_ c:CGContext,_ anim:CGFloat) {
    card(c,230,150,1018,78)
    circle(c,250,170,37,0xf0ebff)
    drawText(c,"✳",260,177,17,0x7757d5,true)
    drawText(c,"AI · Մեքենայական ուսուցում և տվյալագիտություն",302,164,14,0x302a39,true)
    drawText(c,"15 ամիս · ուսումնական ճանապարհային քարտեզ",302,190,9,0x898391)
    badge(c,"4 ՈՒՍԱՆՈՂ",1082,176,0xf2eff7,0x6d6476,8)
    let phases:[(String,String,[String],UInt32)] = [
        ("01 · Հիմքեր","Python, մաթեմատիկա և համակարգչային գիտություն",["Python-ի հիմունքներ","Խնդիրների լուծում","Գծային հանրահաշիվ"],0x7a5ad7),
        ("02 · Հիմնական կարողություններ","Տվյալագիտություն և դասական ML",["SQL և Pandas","Վիճակագրություն","Մեքենայական ուսուցում"],0x3f8fd4),
        ("03 · Մասնագիտացում","Խորը ուսուցում և ավարտական աշխատանք",["Deep Learning","Computer Vision","Վերջնական նախագիծ"],0x32a57a)
    ]
    for (i,p) in phases.enumerated() {
        let x:CGFloat=230+CGFloat(i)*341
        card(c,x,246,322,294)
        circle(c,x+18,267,31,[0xf0ebff,0xeaf4ff,0xe6f6ef][i])
        drawText(c,String(i+1),x+29,274,10,p.3,true)
        drawText(c,p.0,x+61,270,12,0x342d40,true)
        paragraph(c,p.1,x+18,309,282,9,0x847d8b,false,1.35)
        line(c,x+20,347,x+302,347,0xf0edf4)
        for (j,module) in p.2.enumerated() {
            let y:CGFloat=366+CGFloat(j)*47
            circle(c,x+20,y+1,18,j<2 ? 0xe7f5ee : 0xf1eff5)
            drawText(c,j<2 ? "✓" : "•",x+25,y+4,9,j<2 ? 0x338661 : 0x928b99,true)
            drawText(c,module,x+50,y+4,9,0x544e5d,j<2)
            drawText(c,j<2 ? "Ավարտված" : i==1 && j==2 ? "Ընթացքում" : "Առաջիկա",x+50,y+21,7,j<2 ? 0x3a916f : 0x9993a0)
        }
    }
    card(c,230,555,1018,37)
    drawText(c,"Օրինակային բովանդակություն · ճանապարհային քարտեզները ցուցադրական են",250,566,8,0x8a8491)
    badge(c,"AI",1155,562,0xf1edff,0x7154c3,8)
}
func drawTalent(_ c:CGContext,_ anim:CGFloat) {
    card(c,230,150,304,430,"Որոնման չափանիշներ")
    drawText(c,"Ընտրեք համապատասխան հմտությունները",250,183,8,0x8c8593)
    drawText(c,"ՊԱՀԱՆՋՎՈՂ ՀՄՏՈՒԹՅՈՒՆՆԵՐ",250,212,8,0x817a89,true)
    badge(c,"Python  ×",250,230,0xf0ebff,0x6d53c1,9)
    badge(c,"Մեքենայական ուսուցում  ×",250,260,0xeaf4ff,0x4677bf,8)
    drawText(c,"ՄԱԿԱՐԴԱԿ",250,306,8,0x817a89,true)
    badge(c,"Միջին+",250,324,0xf7f5f8,0x635a6c,9)
    drawText(c,"ՆԱԽԱԳԾԵՐ",250,366,8,0x817a89,true)
    badge(c,"Առնվազն 2",250,384,0xf7f5f8,0x635a6c,9)
    drawText(c,"ԸՆԹԱՑՔ",250,427,8,0x817a89,true)
    progressBar(c,250,450,250,0.35,0x8060df,anim)
    drawText(c,"35% և ավելի",250,462,8,0x7e7786)
    rect(c,250,513,261,42,0x7654d4,11)
    drawText(c,"Գտնել համընկնումները",284,526,10,0xffffff,true)
    drawText(c,"2 համընկնող ուսանող",562,153,17,0x2b2435,true)
    badge(c,"ԴԵՄՈ ՀԱՄԸՆԿՆՈՒՄ",1080,157,0xfff2e5,0xb3783c,8)
    drawText(c,"Չի հանդիսանում աշխատանքի առաջարկ կամ գնահատական",562,179,8,0x898391)
    let matches:[(String,String,String,UInt32,String)] = [
        ("Արամ Սարգսյան","82% · AI","Python · Առաջադեմ",0x7c5cdb,"3 ավարտված նախագիծ"),
        ("Մարիամ Պետրոսյան","100% · AI","Python · Առաջադեմ",0x37a078,"2 ավարտված նախագիծ")
    ]
    for (i,m) in matches.enumerated() {
        let y:CGFloat=204+CGFloat(i)*166
        card(c,562,y,686,149)
        circle(c,582,y+17,42,i==0 ? 0xeee8ff : 0xe3f5ec)
        drawText(c,i==0 ? "ԱՍ" : "ՄՊ",590,y+29,10,i==0 ? 0x6d51bf : 0x348260,true)
        drawText(c,m.0,640,y+18,12,0x302a39,true)
        drawText(c,m.1,640,y+42,8,0x87808e)
        badge(c,"ԴԵՄՈ",1128,y+20,0xf6f3fb,m.3,8)
        line(c,582,y+71,1228,y+71,0xf0edf3)
        drawText(c,"Համընկնող հմտություններ",582,y+82,8,0x827b8a)
        badge(c,"Python · Առաջադեմ",582,y+101,0xf0ebff,0x6b4fc0,8)
        badge(c,"Մեքենայական ուսուցում · Միջին",718,y+101,0xeaf4ff,0x4777bd,8)
        drawText(c,m.4,1026,y+105,8,0x605a67,true)
    }
    card(c,562,548,686,38)
    drawText(c,"Արդյունքները հաշվարկված են ցուցադրական տվյալների հիման վրա",582,560,8,0x8b8492)
}
func drawAnalytics(_ c:CGContext,_ anim:CGFloat) {
    drawMetrics(c,anim)
    card(c,230,263,495,290,"Առաջընթացն ըստ փուլերի")
    drawText(c,"32 ուսանող · նույն դեմո տվյալաշար",250,297,9,0x8a8491)
    let buckets:[(String,CGFloat,UInt32)] = [("0–25%",0.28,0x9d88e5),("26–50%",0.47,0x8060df),("51–75%",0.62,0x5a8ed8),("76–99%",0.84,0x4aa988),("100%",0.32,0x43ad7f)]
    for (i,b) in buckets.enumerated() {
        let x:CGFloat=260+CGFloat(i)*87
        let h:CGFloat=150*b.1*anim
        rect(c,x,493-h,42,h,b.2,8)
        drawText(c,b.0,x-5,508,8,0x7f7887)
    }
    card(c,741,263,507,290,"Ավարտված նախագծեր ըստ ամսվա")
    drawText(c,"71 նախագիծ · 51 ավարտված",761,297,9,0x8a8491)
    let vals:[CGFloat]=[0.3,0.49,0.37,0.62,0.76,0.94]
    let months=["Հուն","Հուլ","Օգս","Սեպ","Հոկ","Նոյ"]
    for (i,v) in vals.enumerated() {
        let x:CGFloat=780+CGFloat(i)*65
        let h:CGFloat=158*v*anim
        rect(c,x,493-h,31,h,0x886be0,8)
        drawText(c,months[i],x-8,508,8,0x7f7887)
    }
    line(c,770,493,1210,493,0xded9e5,1)
    card(c,230,569,1018,33)
    drawText(c,"Բոլոր ցուցանիշները հաշվարկվում են նույն խմբագրվող դեմո տվյալներից",250,577,8,0x827b89)
}
func drawClosing(_ c:CGContext,_ scene:Int,_ relative:CGFloat) {
    rect(c,0,0,CGFloat(W),CGFloat(H),0x111019)
    circle(c,860+sin(relative*0.55)*25,54,420,0x7d58dc,0.12)
    circle(c,1040,365+cos(relative*0.48)*18,320,0x3d89d8,0.08)
    drawLogo(c,90,66,52)
    drawText(c,"Talent Hub",156,68,15,0xffffff,true)
    drawText(c,"Ուսանողների տաղանդների հարթակ",156,94,9,0xb7afc2)
    badge(c,"ՑՈՒՑԱԴՐԱԿԱՆ ՄԻՋԱՎԱՅՐ",90,155,0x342b44,0xd7caff,9)
    if scene==8 {
        drawText(c,"Տվյալները հորինված են",90,221,31,0xffffff,true)
        drawText(c,"Անկախ ցուցադրական հայեցակարգ։",90,280,16,0xd3c6ed)
        drawText(c,"Պաշտոնական համակարգ չէ։",90,313,13,0xa9a1b4)
        // glass disclosure panel
        rect(c,90,385,784,92,0x211c2b,18,0x443750)
        circle(c,112,408,34,0x3d3152)
        drawText(c,"i",125,414,16,0xcdbbff,true)
        paragraph(c,"Բոլոր ուսանողների անունները, հմտությունները, նախագծերն ու գնահատականները ստեղծվել են միայն ցուցադրության համար։",164,403,680,11,0xddd7e6,false,1.45)
        drawText(c,"Անկախ արտադրանքի գաղափար · 2026",90,515,10,0x8c8499)
    } else {
        drawText(c,"Բացահայտեք",90,238,18,0xbca8ff,true)
        drawText(c,"ուսանողների ներուժը",90,277,34,0xffffff,true)
        drawText(c,"Տեսանելի աճ · գործնական ապացույցներ · հստակ որոնում",90,337,12,0xc6bdcf)
        rect(c,90,400,267,46,0x7654d4,14)
        drawText(c,"Բացահայտել տաղանդը",115,414,11,0xffffff,true)
        rect(c,376,400,278,46,0x231d2e,14,0x514466)
        drawText(c,"Talent Hub",400,414,10,0xd9d1e4,true)
        drawText(c,"Բացահայտեք տաղանդը · Պատկերեք աճը · Միացրեք ներուժը",90,510,9,0x9d95a8)
    }
    // floating mini cards
    rect(c,910,165,279,200,0x1c1825,19,0x3a3144)
    drawText(c,"Տաղանդների որոնում",933,188,12,0xffffff,true)
    drawText(c,"2 համապատասխանող ուսանող",933,215,8,0xa69daf)
    badge(c,"Python",933,245,0x332940,0xe2d7ff,8)
    badge(c,"Մեքենայական ուսուցում",1003,245,0x283447,0xc9ddff,8)
    progressBar(c,933,296,206,0.82,0x9274e8,1)
    drawText(c,"82%",1152,288,12,0xcabaff,true)
    line(c,933,328,1164,328,0x393343)
    drawText(c,"Սա միայն ցուցադրական համընկնում է",933,338,7,0x9e96a7)
    circle(c,1050,446,126,0xffffff,0,0x7962a8,1.5)
    circle(c,1082,477,62,0xffffff,0,0x4b81b2,1)
}
func drawScene(_ c:CGContext,_ scene:Int,_ t:Double) {
    let rel=max(0,t-(scene < 10 ? [0.0,3.621708,7.926083,13.985125,19.977604,25.410646,31.460833,39.898729,43.272771,47.787604][scene] : 49.248))
    let progress=ease(CGFloat(rel/0.8))
    if scene==0 || scene==1 {
        rect(c,0,0,CGFloat(W),CGFloat(H),0x101018)
        circle(c,760+sin(t*0.45)*18,20,490,0x805be4,0.11)
        circle(c,1000,300+cos(t*0.35)*12,330,0x378edc,0.07)
        drawLogo(c,72,60,45)
        drawText(c,"Talent Hub",131,61,15,0xffffff,true)
        drawText(c,"Ուսանողների տաղանդների հարթակ",131,88,8,0xb8b1c3)
        badge(c,"ՑՈՒՑԱԴՐԱԿԱՆ ՄԻՋԱՎԱՅՐ",72,148,0x342b44,0xd8cdff,9)
        drawText(c,"Բացահայտեք տաղանդը",72,210,29,0xffffff,true,progress)
        drawText(c,"Տեսանելի աճ · գործնական ապացույցներ",72,268,12,0xc6bdcf)
        drawText(c,"32 ուսանող  ·  8 ուղղություն  ·  71 նախագիծ",72,300,10,0xa39aaa)
        // demo product window
        rect(c,550,75,650,470,0xffffff,20,0xe8e3ef,1)
        rect(c,550,75,650,48,0x211d29,20)
        rect(c,550,103,650,20,0x211d29)
        circle(c,574,91,8,0xff827a); circle(c,590,91,8,0xffc15e); circle(c,606,91,8,0x58c98f)
        drawText(c,"Talent Hub",635,89,9,0xe6e0ec,true)
        rect(c,550,123,128,422,0x191720)
        drawLogo(c,568,141,24)
        drawText(c,"Talent Hub",600,147,8,0xffffff,true)
        for (i,s) in ["Գլխավոր","Ուսանողներ","Դասընթացներ","Հմտություններ","Նախագծեր","Տաղանդներ"].enumerated() {
            let y:CGFloat=187+CGFloat(i)*39
            if i==0 {rect(c,560,y-5,108,27,0x352c47,7)}
            drawText(c,["◉","◌","▣","✦","▧","◎"][i],570,y,10,i==0 ? 0xd5c9ff : 0xb3adba,true)
            drawText(c,s,589,y+1,7,i==0 ? 0xffffff : 0xbeb8c5,i==0)
        }
        drawText(c,"Տաղանդների ընդհանուր պատկերը",700,151,13,0x302a39,true)
        let kx:[CGFloat]=[700,820,940,1060]
        let kv=[("32","Ուսանողներ"),("8","Ուղիներ"),("71","Նախագծեր"),("64%","Միջին աճ")]
        for i in 0..<4 {
            rect(c,kx[i],182,108,77,0xffffff,10,0xece8f0)
            drawText(c,kv[i].0,kx[i]+11,194,19,0x292435,true)
            drawText(c,kv[i].1,kx[i]+11,226,7,0x817a89)
        }
        rect(c,700,276,268,178,0xffffff,10,0xece8f0)
        drawText(c,"Ուսանողներն ըստ դասընթացի",715,289,8,0x413b48,true)
        for i in 0..<5 {
            let y:CGFloat=318+CGFloat(i)*24
            drawText(c,["AI","AI DevHack","Հավելվածների մշակում","UX/UI","Գրաֆիկական դիզայն"][i],715,y,7,0x827b88)
            rect(c,800,y+2,145,7,0xf0edf4,4)
            rect(c,800,y+2,CGFloat([103,92,82,70,62][i])*progress,7,0x8465da,4)
        }
        rect(c,986,276,190,178,0xffffff,10,0xece8f0)
        drawText(c,"Ամենահաճախ հանդիպող",1000,289,8,0x413b48,true)
        for i in 0..<4 {
            let y:CGFloat=320+CGFloat(i)*28
            drawText(c,["Python","React","Figma","Linux"][i],1000,y,7,0x665f6d)
            progressBar(c,1042,y+4,110,[0.86,0.66,0.58,0.48][i]*progress,0x8060df,1)
        }
        if scene==1 {
            rect(c,560,496,640,49,0x201b29,0,nil,1,0.90)
            drawText(c,"Բոլոր գրառումներն ու չափումները հորինված են",589,510,9,0xf1eaff,true)
        }
    } else if scene==8 || scene==9 {
        drawClosing(c,scene,rel)
    } else {
        shell(c,scene,rel)
        c.saveGState()
        c.translateBy(x:0,y:CGFloat(16*(1-progress)))
        c.setAlpha(progress)
        switch scene {
        case 2:drawDashboard(c,progress)
        case 3:drawDirectory(c,progress)
        case 4:drawProfile(c,progress)
        case 5:drawRoadmap(c,progress)
        case 6:drawTalent(c,progress)
        case 7:drawAnalytics(c,progress)
        default:break
        }
        c.restoreGState()
    }
}

struct Cue { let start:Double; let end:Double; let text:String }
let cues:[Cue] = [
    Cue(start:0.0,end:2.710875,text:"Բարի գալուստ Talent Hub։"),
    Cue(start:3.621708,end:7.006021,text:"Սա ցուցադրական միջավայր է․ բոլոր տվյալները հորինված են։"),
    Cue(start:7.926083,end:13.072854,text:"Գլխավոր էջում տեսնում եք ուսանողների թիվը, դասընթացները, առաջընթացն ու նախագծերը։"),
    Cue(start:13.985125,end:19.068521,text:"Ուսանողների բաժնում որոնեք անունով, զտեք ըստ ուղղության կամ հմտության և բացեք պրոֆիլը։"),
    Cue(start:19.977604,end:24.481667,text:"Պրոֆիլում դիտեք ուսումնական փուլերը, հմտությունների ապացույցներն ու նախագծերը։"),
    Cue(start:25.410646,end:30.566437,text:"Դասընթացների, հմտությունների և նախագծերի բաժինները ցույց են տալիս ամբողջ ուսումնական ուղին։"),
    Cue(start:31.460833,end:38.957937,text:"Տաղանդների որոնման մեջ ընտրեք Python, React կամ Linux և համադրեք հմտություններն ու փորձը՝ համապատասխանող ուսանողներին գտնելու համար։"),
    Cue(start:39.898729,end:42.353604,text:"Վերլուծությունն ամփոփում է դեմո տվյալները։"),
    Cue(start:43.272771,end:46.803333,text:"Սա անկախ ցուցադրական նախագիծ է, ոչ պաշտոնական համակարգ։"),
    Cue(start:47.787604,end:49.248,text:"Բացահայտեք տաղանդը։")
]
func drawCaption(_ c:CGContext,_ cue:Cue,_ t:Double) {
    let fadeIn=min(1,max(0,(t-cue.start)/0.12))
    let fadeOut=min(1,max(0,(cue.end-t)/0.12))
    let a=CGFloat(min(fadeIn,fadeOut))
    let captionW:CGFloat=1110
    let lines=wrapped(cue.text,size:22,maxWidth:captionW-76,bold:true)
    let h=CGFloat(max(1,lines.count))*30+24
    let y=CGFloat(H)-h-25
    rect(c,85,y,1110,h,0x17141e,15,0x4e4263,1,0.92*a)
    rect(c,101,y+14,4,h-28,0x9a7bf2,2,nil,1,a)
    let totalH=CGFloat(lines.count)*30
    let top=y+(h-totalH)/2-2
    for (i,s) in lines.enumerated() {
        let w=lineWidth(s,22,true)
        drawText(c,s,(CGFloat(W)-w)/2,top+CGFloat(i)*30,22,0xffffff,true,a)
    }
}

let outputURL=URL(fileURLWithPath:CommandLine.arguments.count>1 ? CommandLine.arguments[1] : "demo-video/frames")
let framesURL=outputURL
try? FileManager.default.removeItem(at:framesURL)
try FileManager.default.createDirectory(at:framesURL,withIntermediateDirectories:true)
let count=Int(duration*Double(fps))
let sceneStarts=[0.0,3.621708,7.926083,13.985125,19.977604,25.410646,31.460833,39.898729,43.272771,47.787604]
let sceneEnds=[2.710875,7.006021,13.072854,19.068521,24.481667,30.566437,38.957937,42.353604,46.803333,49.248]
for frame in 0..<count {
    guard let context=CGContext(data:nil,width:W,height:H,bitsPerComponent:8,bytesPerRow:0,space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue) else { fatalError("Cannot allocate frame context") }
    let t=Double(frame)/Double(fps)
    context.setFillColor(color(0xf7f6f9)); context.fill(CGRect(x:0,y:0,width:W,height:H))
    var active=0
    for i in 0..<sceneStarts.count { if t >= sceneStarts[i] { active=i } }
    if active < 9 {
        let fadeStart=sceneEnds[active]+0.12
        let fadeEnd=min(sceneStarts[active+1],fadeStart+0.34)
        if t>=fadeStart && t<fadeEnd {
            let u=ease(CGFloat((t-fadeStart)/(fadeEnd-fadeStart)))
            context.saveGState(); context.setAlpha(1-u); drawScene(context,active,t); context.restoreGState()
            context.saveGState(); context.setAlpha(u); drawScene(context,active+1,t); context.restoreGState()
        } else { drawScene(context,active,t) }
    } else { drawScene(context,active,t) }
    if let cue=cues.first(where:{t >= $0.start && t <= $0.end}) { drawCaption(context,cue,t) }
    guard let image=context.makeImage() else { fatalError("Cannot finalize frame image") }
    let frameURL=framesURL.appendingPathComponent(String(format:"%05d.png",frame))
    guard let destination=CGImageDestinationCreateWithURL(frameURL as CFURL,UTType.png.identifier as CFString,1,nil) else { fatalError("Cannot create frame image file") }
    CGImageDestinationAddImage(destination,image,nil)
    guard CGImageDestinationFinalize(destination) else { fatalError("Cannot write frame image") }
}
print("Rendered \(count) frames to \(framesURL.path)")
