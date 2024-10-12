#include <iostream>
using namespace std;
class construct
{
    int x, y;

public:
    construct() {}
    construct(int a, int b)
    {
        x = a;
        y = b;
    }
    //If we not make  copy constructor the compiler supplies the copy constructor
    construct(construct &a){
        cout<<"This is copy constructor"<<endl;
        y=a.y;
        x=a.x;

    } 
    void print()
    {
        cout << "Value of A  and B is " << x << " " << y << endl;
    }
};
int main()
{
    construct a1(15,14);
    a1.print();

    construct a2=a1;
    a2.print();
}