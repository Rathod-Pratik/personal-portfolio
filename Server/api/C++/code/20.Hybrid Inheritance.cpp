#include<iostream>
using namespace std;

class a{
    public:
    int a=15;
};
class b{
    public:
    int b=20;
};
class c:public a,public b{
    public:
   int  myfun(){
        cout<<"Sum of A and B is :"<<a+b<<endl;
    }
};
class d:public a{
    public:
    int myfun(){
        cout<<"Value of a from class d :" << a <<endl;
    }
};
class e:public d{
    public:
  int myfun(){
    cout<< "Value of a from class e :" << a <<endl;
    }
};
class f:public d{
    public:
  int myfun(){
    cout<< "Value of a from class f :"<< a <<endl;
    }
};
int main(){
    c c1;
    c1.myfun();
    d d1;
    d1.myfun();
    e e1;
    e1.myfun();
    f f1;
    f1.myfun();
}