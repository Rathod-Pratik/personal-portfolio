#include<iostream>
using namespace std;
    static int x=0;
class myclass{
    public:
     myclass(){
        x++;
        cout<<"Number of object create :"<<x<<endl;
    }
    ~myclass(){
        cout<<"Value of object destroy :"<<x<<endl;
         x--;
    }
};
int main(){
    myclass a,b,c,d;
}