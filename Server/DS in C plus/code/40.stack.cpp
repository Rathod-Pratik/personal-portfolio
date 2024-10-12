#include <iostream>
using namespace std;

#define n 100
class stack
{
    int *arr;
    int top;

public:
    stack()
    {
        arr = new int[n];
        top = -1;
    }

    void push(int x)
    {
        if (top == n-1)
        {
            cout << "Stack is empty" << endl;
            return;
        }
        top++;
        arr[top] = x;
    }
    void pop()
    {
        if (top == -1)
        {
            cout << "Stack is empty" << endl;
            return;
        }
        top--;
    }
    void diplay()
    {
        if (top == -1)
        {
            cout << "Stack is empty" << endl;
            return;
        }

        int i;
        for (i = top; i >= 0; i--)
        {
            cout << arr[i] << endl;
        }
    }

    void peep(int x){
        if (top == -1)
        {
            cout << "Stack is empty" << endl;
            return;
        }

        else{
            if(x<0 || x>top+1){
                cout<<"Out of range"<<endl;
            }
            else{
                cout<<arr[top-x+1]<<endl;
            }
        }

    }
};
int main()
{
    stack p;
    p.push(40);
    p.push(50);
    p.push(60);
    p.push(70);
    p.push(80);
    p.diplay();
    cout<<"\nAfter pop \n";
    p.pop();
    p.pop();
    p.diplay();

    p.peep(2);
}