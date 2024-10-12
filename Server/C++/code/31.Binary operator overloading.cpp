#include<iostream>
using namespace std;
class myclass{
	public:
	float hight;
	float width;
		myclass(){
			this->hight=0;
			this->width=0;
		}
		myclass(float A,float B){
		    this->hight=A;
			this->width=B;
		}
		
	myclass operator +(myclass &d2){
			myclass d3;
			d3.hight= this->hight + d2.hight;
			d3.width= this->width + d2.width;
			
			return d3;
		}
};
int main(){
	myclass d1(10,20);
	myclass d2(100,75);
	
	myclass d3;
	d3=d1+d2;
	
	cout<<"Value of height is :"<<d3.hight<<endl;
	cout<<"Value of width is :"<<d3.width<<endl;
	
	return 0;
}
