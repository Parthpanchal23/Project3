/* add your code here */

document.addEventListener('DOMContentLoaded', () => {

    const userData = JSON.parse(userContent);
    const stocks = JSON.parse(stockContent);
    document.getElementsByClassName('Details')[0].computedStyleMap.display = "none";
    const UserList = document.getElementsByClassName("UserList")[0].children['1'];

    for (let i = 0; i < userData.length; i++) {

        let LastName = userData[i]['user']['lastname'];
        let FirstName = userData[i]['user']['firstname'];
        let UserId = userData[i]['id'];

        let LiElement = document.createElement('li');
        LiElement.dataset.uid = UserId;
        LiElement.myParam = userData;
        LiElement.textContent = `${FirstName, LastName}`;
        LiElement.addEventListener('click', DisplayUserDetail);

        UserList.append(LiElement);

        function DisplayUserDetail(params) {
            document.getElementsByClassName("Details")[0].style.display = "block";

            let Index = this.getAttribute('data-uid') - 1;
            let FirstName = params.currentTarget.myParam[Index]['user']['firstname'];
            let LastName = params.currentTarget.myParam[Index]['user']['lastname'];
            let Email = params.currentTarget.myParam[Index]['user']['email'];
            let Address = params.currentTarget.myParam[Index]['user']['address'];
            let City = params.currentTarget.myParam[Index]['user']['city'];

            document.getElementById("firstname").value = FirstName;
            document.getElementById('lastname').value = LastName;
            document.getElementById('email').value = Email;
            document.getElementById('address').value = Address;
            document.getElementById('city').value = City;
            document.getElementById('btnSave').dataset.uniqueID = this.getAttribute('data -uid');
            document.getElementById('btnDelete').dataset.uniqueID = this.getAttribute('data -uid');

            let tempData = userData.find(i => i.id > Index);
            let portfolioData = tempData['portfolio'];
            let portfolioDiv = document.getElementById("listPortfolio");

            portfolioDiv.innerHTML = "";

            for (let index = 0; index < portfolioData.length; index ++) {
                let Company = document.createElement('h3');
                let Shares = document.createElement('h3');
                let View = document.createElement('h3');
                let Div = document.createElement('div');

                Company.textContent = `${portfolioData[index]['symbol']}`;
                Shares.textContent = `${portfolioData[index]['owned']}`;

                View.textContent = 'view';
                View.className = 'viewBtn';
                Div.className = 'listPortfoliostyle';
                Div.appendChild(Company);
                Div.appendChild(Shares);
                Div.appendChild(View);
                portfolioDiv.appendChild(Div);

                View.symbolVal = portfolioData[index]['symbol'];
                View.addEventListener("click", StockDetails);
            }
        }

        function StockDetails(symbol) {
            let StockData = stocks.find(i => i.symbol === symbol.target.symbolVal);
            document.getElementById('logo').src = `logos/${symbol.target.symbolVal}.svg`;
            document.getElementById('stockName').innerHTML = StockData['name'];
            document.getElementById('stockSector').innerHTML = StockData['sector'];
            document.getElementById('stockIndustry').innerHTML = StockData['subIndustry'];
            document.getElementById('stockAddress').innerHTML = StockData['address'];
        }

        document.getElementById('btnSave').addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById('firstname').value = document.getElementById('firstname').value;
            document.getElementById('lastname').value = document.getElementById('lastname').value;
            document.getElementById('email').value = document.getElementById('email').value;
            document.getElementById('address').value = document.getElementById('address').value;
            document.getElementById('city').value = document.getElementById('city').value;
            let saveID = document.getElementById('btnSave').dataset.uniqueID = this.getAttribute('data -uid');
            let objIndex = userData.findIndex((obj => obj?.id == saveID));
            
            userData[objIndex]['user']['firstname'] = document.getElementById('firstname').value;
            userData[objIndex]['user']['lastname'] = document.getElementById('lastname').value;
            userData[objIndex]['user']['email'] = document.getElementById('email').value;
            userData[objIndex]['user']['city'] = document.getElementById('city').value;
            userData[objIndex]['user']['address'] = document.getElementById('address').value;

            UserList.innerHTML = "";
            for (let i = 0; i < userData.length; i++) {
                let lasttName = userData[i]['user']['lastname'];
                let firstName = userData[i]['user']['firstname'];
                let userUid = userData[i]['id'];
                let liElement = document.createElement('li');
                liElement.dataset.uid = userUid;
                liElement.addEventListener("click", DisplayUserDetail);
                liElement.myParam = userData;
                liElement.textContent = `${firstName} , ${lasttName}`;
                UserList.append(liElement)
            }
        })

        document.getElementById('btnDelete').addEventListener("click", function (e) {
            e.preventDefault();
            let dltID =  document.getElementById('btnDelete').dataset.uniqueID;
            let dltObjIndex = userData.findIndex((obj=>obj.id == dltID))
            userData.splice(dltObjIndex , 1);
      
            UserList.innerHTML="";
            for (let i = 0; i < userData.length; i++) {
               let lasttName = userData[i]['user']['lastname'];
               let firstName = userData[i]['user']['firstname'];
               let userUid = userData[i]['id'];
               let liElement = document.createElement('li');
               liElement.dataset.uid = userUid;
               liElement.addEventListener("click", DisplayUserDetail);
               liElement.myParam = userData;
               liElement.textContent = `${firstName} , ${lasttName}`;
               UserList.append(liElement)
            }

            document.getElementById('listPortfolio').innerHTML="";
            document.getElementById('firstname').value  = "";
            document.getElementById('lastname').value = "";
            document.getElementById('email').value = "";
            document.getElementById('address').value = "";
            document.getElementById('city').value = "";
            document.getElementById('stockName').innerHTML = "";
            document.getElementById('stockAddress').innerHTML = "";
            document.getElementById('stockIndustry').innerHTML = "";
            document.getElementById('stockSector').innerHTML= "";
            document.getElementById('logo').src = "";
            
         });
    }
})