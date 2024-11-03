#include<iostream>
using namespace std;

class A{
    public:
    int a=10;
};
class B{
    public:
    int b=20;
};
class C :public A,public B{
    public:
    void myfun(){
        cout<< "Value of A is :"<<a<<endl;
        cout<< "Value of B is :"<<b<<endl;
        cout<<"Value of A * B is :"<<a*b<<endl;
    }
};
int main(){
    C a1;
    a1.myfun();
}