
const service=require('./userServices');
jest.mock('./userServices');

describe("Test service calls Backend ", ()=>{
    test('postRegister should return a user', async() => {
      //let id=Math.floor(Math.random()*100);
      const body = {
        firstName: 'Nagin',
        lastName: 'Sharma',
        address: '123 Mile Road',
        city: 'nagpur',
        state: 'Maharastra',
        zipcode: '345',
        email: 'nagin123@gmail.com',
        password: 'nagin123',
      };

      const user=await service.postRegister(body);
      expect(user.data.message).toEqual('Registration successful');
      expect(user.data.registeredUser.firstName).toEqual('Nagin');
      expect(user.data.registeredUser.lastName).toEqual('Sharma');
      expect(user.data.registeredUser.address).toEqual('123 Mile Road');
      expect(user.data.registeredUser.city).toEqual('nagpur');
      expect(user.data.registeredUser.state).toEqual('Maharastra');
      expect(user.data.registeredUser.zipcode).toEqual('345');
      expect(user.data.registeredUser.email).toEqual('nagin123@gmail.com');
      expect(user.data.registeredUser.password).toEqual('nagin123');
    })


    test('postLogin should return a user', async()=>{
        const body={
            email: "arati123@gmail.com",
            password: "arati123"
        };

        const user=await service.postLogin(body);

        expect(user.data.message).toEqual('Logged in successfully');
        expect(user.data.registeredUser.firstName).toEqual('Arati');
        expect(user.data.registeredUser.lastName).toEqual('ghosh');
        expect(user.data.registeredUser.address).toEqual('ruby');
        expect(user.data.registeredUser.city).toEqual('kolkata');
        expect(user.data.registeredUser.state).toEqual('West Bengal');
        expect(user.data.registeredUser.zipcode).toEqual('107');
        expect(user.data.registeredUser.email).toEqual('arati123@gmail.com');
        expect(user.data.registeredUser.password).toEqual('arati123');
        expect(user.data.Logged).toBe(true);
    })
    
})