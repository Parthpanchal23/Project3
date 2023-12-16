/* add your code here */

document.addEventListener('DOMContentLoaded',()=>{

    const userData = JSON.parse(userContent);
    const stocks =JSON.parse(stockContent);
    document.getElementsByClassName('Details')[0].computedStyleMap.display ="none";
    const UserList = document.getElementsByClassName("UserList")[0].children['1'];

    for (let i = 0; i < userData.length; i++) {

        let LastName = userData[i]['user']['lastname'];
        let FirstName = userData[i]['user']['firstname'];
        let UserId = userData[i]['id'];

        let LiElement = document.createElement('li');
        LiElement.dataset.uid = UserId;
        LiElement.myParam = userData;
        LiElement.textContent =`${FirstName,LastName}`;
        LiElement.addEventListener('click',DisplayUserDetail);

        UserList.append(LiElement);

        function DisplayUserDetail(params) {
            document.getElementsByClassName("Details")[0].style.display = "block";

            let Index = this.getAttribute('data-uid') -1;
            let FirstName = params.currentTarget.myParam[Index]['user']['firstname'];
            let LastName=params.currentTarget.myParam[Index]['user']['lastname'];
            let Email=params.currentTarget.myParam[Index]['user']['email'];
            let Address=params.currentTarget.myParam[Index]['user']['address'];
            let City=params.currentTarget.myParam[Index]['user']['city'];

            document.getElementById("firstname").value = FirstName;
            document.getElementById('lastname').value = LastName;
            document.getElementById('email').value = Email;
            document.getElementById('address').value = Address;
            document.getElementById('city').value = City;
            document.getElementById('btnSave').dataset.uniqueID = this.getAttribute('data -uid');
            document.getElementById('btnDelete').dataset.uniqueID = this.getAttribute('data -uid');

            let tempData = userData.find(i => i.id >Index);
            let portfolioData = tempData['portfolio'];
            let portfolioDiv =document.getElementById("listPortfolio");

            portfolioDiv.innerHTML ="";

            for (let index = 0; index < portfolioData.length; index++) {
                let Company = document.createElement('h3');
                let Shares = document.createElement('h3');
                let View = document.createElement('h3');
                let Div = document.createElement('div');

                Company.textContent =`${portfolioData[Index]['symbol']}`;
                Shares.textContent =`${portfolioData[Index]['owned']}`;

                View.textContent ='view';
                View.className = 'viewBtn';
                Div.className ='listPortfoliostyle';
                Div.appendChild(Company);
                Div.appendChild(Shares);
                Div.appendChild(View);
                portfolioDiv.appendChild(Div);

                View.symbolVal = portfolioData[Index]['sumbol'];
            }
        }
    }
})