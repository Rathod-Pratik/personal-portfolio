#include<iostream>
using namespace std;
class complex{
    int a,b;
    friend complex complexsum(complex a1,complex a2);
    public:
    void sum(int m,int n){
        a=m;
        b=n;
    }
    void print(){
        cout<<"Value of a is "<<a<<" Value of b is "<<b<<endl;
    }
};

complex complexsum(complex a1,complex a2){
    complex a3;
    a3.sum((a1.a +a2.a) , (a1.b+a2.b));
    return a3;

}
int main(){
    complex c1,c2,sum;
    c1.sum(15,25);
    c2.sum(12,8);
    c1.print();
    c2.print();

    sum = complexsum(c1,c2);
    sum.print();


}