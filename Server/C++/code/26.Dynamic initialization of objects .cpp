#include <iostream>
using namespace std;
class Bank
{
    int principal;
    float interest;
    float year;
    float ReturnValue;
public:
    Bank() {}
    Bank(int p, int r, int n)
    {
        principal=p;
        interest=float(r)/100;
        year=n;
        ReturnValue=principal;
        cout <<endl<< "Deposited amount (int):"<<endl;

        for (int i = 0; i < year; i++)
        {
            ReturnValue = ReturnValue*(1+interest);
        }
        
    }

    Bank(int p, float r, int n)
    {
        principal=p;
        interest=r/100;
        year=n;
        ReturnValue=principal;
        cout <<endl<< "Deposited amount (float):"<<endl;

        for (int i = 0; i < year; i++)
        {
        ReturnValue = ReturnValue*(1+interest);
        }
        
    }
    void display(){
        cout<<ReturnValue;
    }
};

int main()
{
    int p=200;
    int r=5;
    float R=2.25;
    int n=2;

    Bank i1(p,r,n);
    i1.display();

    Bank i2(p,R,n);
    i2.display();
}