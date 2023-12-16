/* add your code here */

document.addEventListener('DOMContentLoaded',()=>{

    const userData = JSON.parse(userContent);
    const stocks =JSON.parse(stockContent);
    document.getElementsByClassName('Details')[0].computedStyleMap.display ="none";
    const UserList = document.getElementsByClassName("UserList")[0].children['1'];

    for (let i = 0; i < userData.length; i++) {
        
        const LastName = userData[i]['user']['lastname'];
        const FirstName = userData[i]['user']['firstname'];
        const UserId = userData[i]['id'];

        let LiElement = document.createElement('li');
        LiElement.dataset.uid = UserId;
        LiElement.myParam = userData;
        LiElement.textContent =`${FirstName,LastName}`;

        UserList.append(LiElement);
    }
})