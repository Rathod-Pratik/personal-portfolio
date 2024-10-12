#include<iostream>
using namespace std;
class A{
    int a;
    public:
    A & getData(int a){
        /*this -> a is target the value inside the object created by class*/
        /*a is target value passed threw a object*/
        this->a=a;

        /*This used to return object him self*/
        return *this;
    }
    void setData(){
        cout<<"Value of a is "<<a<<endl;
    }
};
int main(){
    A a;
    a.getData(15).setData();
    // a.setData();
}