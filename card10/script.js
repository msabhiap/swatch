let card=document.createElement("div")
card.classname="card"
Object.assign(card.style,{
  border: "2px solid #3498db",
  padding: "10px",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  width:"200px",
  height:"100px"

})
let heading=document.createElement("h4")
heading.className="heading";
heading.textContent="hello there you can do it"
Object.assign(heading.style,{
  fontSize:"16px",
  color:"blue",
display:"flex",
justifyContent: "flex-start", // Notice camelCase (justify-content becomes justifyContent)
  alignItems: "flex-start"


})
card.appendChild(heading)
document.body.appendChild(card)

