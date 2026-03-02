let doc = document.querySelector("#folder");
let renderTeacher = async () => {
  let teachersData = await fetch("http://localhost:3000/api/v1/teacher");
  teachersData = await teachersData.json();
  //   console.log(teachersData);
  let str = "";
  let data = teachersData.data;
  for (let item of data) {
    let a = `<li><a href="#">${item.name}</a></li>`;
    str += a;
  }
  doc.innerHTML = str;
};

renderTeacher();

{
  /* <li><a href="#">NEWS</a></li>
           
            <li><a href="#">Science</a></li>
            <li><a href="#">Life</a></li>
            <li><a href="#">Travel</a></li>
            <li><a href="#">Moneys</a></li>
            <li><a href="#">Art & Design</a></li>
            <li><a href="#">Sports</a></li>
            <li><a href="#">People</a></li>
            <li><a href="#">Health</a></li>
            <li><a href="#">Education</a></li> */
}
