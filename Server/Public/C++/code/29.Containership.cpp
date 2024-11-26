#include<iostream>
using namespace std;
class first{
    public:
    void display(){
        cout<<"This message coming from frist class"<<endl;
    }
};
class second{
    //Create object of first class
    first f;
    public:
        second(){
            f.display();
        }
};
int main(){
second s;
}