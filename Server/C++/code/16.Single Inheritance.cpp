#include<iostream>
using namespace std;
class Base
{
    public:
    int a=10; 
};
class subclass:public Base{
    public:
    void  myfun(){
    cout<< "Value of a is :"<<a<<endl;
    }
};
int main(){
    subclass a1;
    a1.myfun();
}