#include<iostream>
using namespace std;
class constructor{
	int m,n;
	public:
		constructor(int a,int b=125){
			m=a;
			n=b;
			cout<<"Value of m is :" <<m <<endl<< "Value of n is :"<<n<<endl;
		}
		
};
int main(){
	constructor a1(12);
	}
