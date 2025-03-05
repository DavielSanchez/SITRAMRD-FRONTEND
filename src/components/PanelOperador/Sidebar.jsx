import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ handleButtonClick, activeButton }) {
  return (
    <div
      className="
        box-border 
        bg-[#6A62DC]
        w-[120px]
        h-screen
        flex
        flex-col
        items-center
        py-6
        fixed
        top-0
        left-0
        z-20
      "
    >
      {/* Ícono superior (estilo “S”) */}
      <div className="mb-8">
        <svg
          className="w-12 h-12"
          viewBox="0 0 85 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_1143_944"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="1"
            y="8"
            width="83"
            height="69"
          >
            <path d="M1.49023 8.26367H83.2299V76.1456H1.49023V8.26367Z" fill="white" />
          </mask>
          <g mask="url(#mask0_1143_944)">
            <path
              d="M33.0785 8.38121H33.173C33.2768 8.38121 33.3828 8.38121 33.4889 8.38121H33.7172C33.927 8.38121 34.1368 8.38121 34.3489 8.38121C34.5772 8.38121 34.8055 8.38121 35.0338 8.38121C35.488 8.38121 35.9422 8.38121 36.3965 8.38121C36.9406 8.38121 37.4825 8.38121 38.0267 8.3789C39.3087 8.3789 40.593 8.3789 41.875 8.3789C42.5275 8.3789 43.1801 8.3789 43.8349 8.3789C46.5303 8.3766 49.2281 8.3766 51.9235 8.3766C54.0841 8.3766 56.2446 8.3766 58.4028 8.37429C59.9546 8.37429 61.5063 8.37429 63.0581 8.37429H63.155C64.1257 8.37429 65.1402 8.37429 66.1963 8.37429C67.1901 8.37429 68.1839 8.37199 69.1776 8.37199C70.206 8.37199 71.2367 8.37199 72.2651 8.37199C72.8577 8.37199 73.4502 8.37199 74.0451 8.37199C74.4394 8.36968 74.836 8.36968 75.2326 8.37199C75.4586 8.37199 75.6845 8.37199 75.9105 8.36968C76.1157 8.36968 76.3209 8.36968 76.5285 8.37199C76.5999 8.37199 76.6737 8.37199 76.7475 8.36968C77.8681 8.36507 78.9311 8.6556 79.9064 9.20898C80.3099 9.44878 80.6719 9.72778 81.0155 10.046L81.0847 10.1105C81.4305 10.4333 81.7257 10.7815 82 11.1643L82.0854 11.2842C82.6364 12.0958 82.9662 13.1127 83.0676 14.0834C83.1345 15.0334 83.1276 16.0179 82.897 16.9449L82.8693 17.0509C82.5857 18.1369 81.9585 19.0523 81.1953 19.8547L81.1146 19.9424C80.6765 20.4035 80.1393 20.7286 79.5813 21.0192L79.4937 21.0676C79.2885 21.1713 79.0832 21.259 78.8642 21.3327L78.7674 21.3673C78.2393 21.5495 77.6929 21.697 77.1326 21.697H76.5515C76.3601 21.697 76.1687 21.697 75.9774 21.697C75.7675 21.6947 75.56 21.6947 75.3525 21.6947C74.9859 21.6947 74.6216 21.6947 74.2573 21.6947C73.6624 21.6924 73.0675 21.6924 72.4749 21.6924H71.6932L70.5542 21.6901C68.8525 21.6901 67.1509 21.6878 65.4492 21.6878C64.5038 21.6878 63.5608 21.6878 62.6154 21.6878H59.8785C57.9439 21.6878 56.0071 21.6855 54.0725 21.6832C52.0204 21.6809 49.9683 21.6786 47.9161 21.6809H46.8877C45.9839 21.6809 45.08 21.6786 44.1762 21.6763C43.2654 21.6763 42.3569 21.674 41.4484 21.6763C40.9089 21.6786 40.3693 21.6763 39.8298 21.674C39.4678 21.674 39.1058 21.674 38.7461 21.674C38.5408 21.6763 38.3356 21.6763 38.1304 21.674C37.1136 21.6509 37.1136 21.6509 36.1636 21.9714C36.0275 22.0521 35.9007 22.1398 35.7716 22.2297C35.7024 22.2758 35.6333 22.3196 35.5641 22.3634C35.2113 22.5917 34.8793 22.8476 34.5634 23.1266L34.4919 23.1866C33.5696 23.9959 32.9493 24.9482 32.5389 26.108C32.1861 27.1433 31.7988 28.3815 31.9648 29.4859L31.9809 29.5943C32.1838 30.9178 32.5873 32.2483 33.422 33.3158C33.5027 33.415 33.5834 33.5118 33.6664 33.6087L33.7541 33.7078C34.5472 34.5563 35.7186 35.0521 36.8023 35.4003C37.6831 35.6677 38.5316 35.8683 39.4516 35.8637C39.5277 35.8637 39.6015 35.8637 39.6776 35.8637C39.8805 35.8637 40.0857 35.8637 40.2886 35.8637C40.5077 35.8614 40.729 35.8614 40.9504 35.8637C41.3308 35.8637 41.7136 35.8614 42.094 35.8614C42.6474 35.8614 43.2008 35.8614 43.7565 35.8614C44.6558 35.8614 45.5573 35.8614 46.4566 35.8614H46.6203C47.4365 35.8614 48.2528 35.8614 49.069 35.8591H49.2304C50.1273 35.8591 51.0243 35.8591 51.9212 35.8614C52.4723 35.8614 53.0234 35.8614 53.5745 35.8591C53.9526 35.8591 54.3308 35.8591 54.7112 35.8591C54.928 35.8591 55.1447 35.8591 55.3638 35.8591C56.7472 35.8522 58.0661 35.9998 59.4081 36.3572L59.6087 36.4079C59.8001 36.4586 59.9938 36.5116 60.1851 36.5647L60.3488 36.6085C62.318 37.1619 64.1142 38.0796 65.6498 39.4307L65.7467 39.5138C66.2839 39.9772 66.8165 40.4591 67.2754 40.9987C67.3284 41.0609 67.3838 41.1232 67.4414 41.1831C67.7411 41.5059 68.004 41.8541 68.2692 42.2069C68.3314 42.2876 68.3937 42.3706 68.4582 42.4536C68.6704 42.7211 68.8664 42.9955 69.0531 43.2814C69.1869 43.482 69.3229 43.678 69.4613 43.8763C71.6471 46.9614 72.8899 50.3002 73.2519 54.0747C73.3004 54.6027 73.3188 55.1261 73.3188 55.6565V55.7695C73.3119 58.4626 72.7285 61.1903 71.5756 63.6298C71.4949 63.8074 71.4212 63.9872 71.3497 64.1671C71.2183 64.4945 71.0661 64.8081 70.9024 65.124C70.8378 65.2508 70.7732 65.3776 70.7087 65.5044C70.4366 66.0417 70.153 66.5697 69.844 67.0885L69.7564 67.2361C69.3206 67.9624 68.841 68.661 68.2922 69.3089C68.2553 69.3551 68.2184 69.3989 68.1792 69.445C68.0755 69.5695 67.9717 69.6917 67.8657 69.8162C67.8011 69.89 67.7388 69.9661 67.6743 70.0445C67.3722 70.4042 67.0517 70.7408 66.7197 71.0729L66.5975 71.1974C66.3646 71.428 66.1202 71.647 65.8619 71.8522C65.7374 71.956 65.6198 72.0643 65.4999 72.1773C65.2394 72.4171 64.9558 72.597 64.6514 72.7745L64.4831 72.876C64.0404 73.1388 63.5908 73.3902 63.1342 73.6323C62.9982 73.7038 62.8644 73.7775 62.7284 73.849C61.6724 74.4139 60.5817 74.9097 59.4404 75.2786C59.3458 75.3086 59.2513 75.3409 59.1568 75.3731C58.1514 75.7144 57.0723 75.8666 56.0186 75.9842L55.9241 75.9957C55.5229 76.0372 55.1217 76.0349 54.7181 76.0349C54.6351 76.0349 54.5521 76.0349 54.4714 76.0349C54.2455 76.0349 54.0195 76.0349 53.7912 76.0349C53.5468 76.0349 53.3001 76.0349 53.0534 76.0349C52.5669 76.0349 52.078 76.0349 51.5892 76.0349C51.0358 76.0372 50.4801 76.0372 49.9268 76.0372C48.5179 76.0372 47.1068 76.0372 45.698 76.0372C44.997 76.0372 44.2937 76.0372 43.5928 76.0372C40.6921 76.0372 37.7938 76.0395 34.8908 76.0395C32.5689 76.0395 30.247 76.0395 27.9251 76.0418C26.2557 76.0418 24.5886 76.0441 22.9192 76.0441H22.8155C21.7756 76.0441 20.6849 76.0441 19.5436 76.0441C18.476 76.0441 17.4061 76.0441 16.3386 76.0441C15.2618 76.0441 14.185 76.0464 13.1105 76.0441C12.4418 76.0441 11.7731 76.0441 11.1068 76.0464C10.6802 76.0464 10.2536 76.0464 9.82936 76.0464C9.58495 76.0464 9.34284 76.0464 9.10074 76.0464C8.87938 76.0464 8.65803 76.0464 8.43668 76.0464C8.35828 76.0464 8.27988 76.0464 8.19918 76.0464C7.04399 76.051 5.91877 75.8181 4.89962 75.2578C4.50072 75.0273 4.13641 74.7644 3.78824 74.46L3.67526 74.3678C3.3732 74.1119 3.1357 73.819 2.90052 73.5032C2.8544 73.4432 2.80828 73.3809 2.76217 73.321C2.14422 72.4909 1.79144 71.4971 1.64848 70.4803C1.62773 70.2843 1.63004 70.0883 1.62773 69.89V69.747C1.62773 69.6456 1.62773 69.5464 1.62773 69.445C1.62542 69.2951 1.62542 69.1429 1.62312 68.9931C1.62081 68.2667 1.67385 67.5981 1.91595 66.9109C1.92748 66.8717 1.94131 66.8325 1.95515 66.791C2.3333 65.7258 2.98352 64.7689 3.83205 64.0241C4.79356 63.2309 5.88188 62.7606 7.10163 62.5461C7.50053 62.4862 7.89713 62.4954 8.29602 62.4954H8.54044C8.7641 62.4954 8.99006 62.4954 9.21372 62.4954C9.45813 62.4954 9.70024 62.4954 9.94465 62.4954C10.3712 62.4954 10.7978 62.4931 11.2267 62.4954C11.8607 62.4954 12.4971 62.4931 13.1312 62.4931H14.1319C14.6069 62.4931 15.0819 62.4931 15.5569 62.4931H16.0434C18.0056 62.4931 19.9701 62.4931 21.9347 62.4908H22.9607C24.6532 62.4885 26.3433 62.4885 28.0357 62.4885C29.689 62.4862 31.3445 62.4862 32.9978 62.4862H34.8262C36.4795 62.4862 38.1327 62.4862 39.786 62.4839H39.8874C40.9342 62.4839 41.9811 62.4839 43.0256 62.4816H43.1247C44.1831 62.4816 45.2414 62.4816 46.2998 62.4816C47.395 62.4816 48.4903 62.4816 49.5855 62.4816C50.2173 62.4792 50.8491 62.4792 51.4808 62.4792C51.9028 62.4816 52.3248 62.4792 52.7467 62.4792C52.9865 62.4792 53.2263 62.4792 53.4661 62.4792C53.6852 62.4792 53.9042 62.4792 54.1233 62.4792C54.2017 62.4792 54.28 62.4792 54.3584 62.4792C54.8772 62.4885 54.8772 62.4885 55.3638 62.3248C55.569 62.191 55.7465 62.0342 55.9287 61.8728L56.0624 61.7575C56.9202 60.9966 57.5796 60.1274 57.9531 59.0344C58.2368 58.1698 58.382 57.2936 58.4327 56.3874C58.4374 56.2929 58.4443 56.1983 58.4512 56.1061C58.5019 54.9809 58.0154 53.7496 57.5174 52.7627C57.3813 52.4999 57.2268 52.2555 57.0493 52.018L56.9617 51.9004C56.3207 51.0703 55.4491 50.5423 54.4945 50.1364C54.1025 49.975 53.6944 49.8505 53.2863 49.7329L53.2102 49.7099C53.0695 49.6822 52.9312 49.6845 52.7859 49.6845L52.6868 49.6822C52.5784 49.6822 52.4677 49.6822 52.3593 49.6822C52.2786 49.6822 52.2002 49.6822 52.1218 49.6822C51.9489 49.6822 51.776 49.6822 51.603 49.6822C51.3217 49.6822 51.0427 49.6822 50.7614 49.6822C50.3533 49.6822 49.9452 49.6822 49.5371 49.6822C48.8915 49.6822 48.2458 49.6799 47.6002 49.6799H46.9362L46.7701 49.6776C46.1407 49.6776 45.5112 49.6776 44.8817 49.6776L44.7065 49.6753C43.7773 49.6753 42.8457 49.6753 41.9165 49.6753C40.9596 49.673 40.005 49.673 39.0481 49.6707C38.4601 49.6707 37.8722 49.6707 37.2819 49.6707C36.8784 49.6707 36.4726 49.6707 36.0691 49.6684C35.8362 49.6684 35.6033 49.6684 35.3704 49.6684C32.9655 49.673 30.6782 49.2579 28.5153 48.165C28.4785 48.1466 28.4393 48.1281 28.4024 48.1097C27.5792 47.7016 26.8183 47.2081 26.0966 46.6432L25.9744 46.5487C25.8637 46.461 25.7553 46.3734 25.647 46.2858L25.5155 46.1774C25.1651 45.8892 24.8376 45.5733 24.5148 45.2505L24.3903 45.1283C24.1182 44.8562 23.8715 44.5703 23.6317 44.2683C23.551 44.1737 23.4703 44.0792 23.3896 43.9823C23.189 43.7495 22.9999 43.5097 22.8132 43.2629C22.7002 43.1154 22.5849 42.9678 22.4696 42.8202C21.2037 41.2039 20.0854 39.5138 19.1516 37.683L19.094 37.5723C18.6697 36.7399 18.3746 35.8499 18.1232 34.9506L18.0817 34.8031C17.6944 33.4011 17.4938 31.9647 17.36 30.5166L17.3462 30.3644C17.2286 28.8588 17.2171 27.2932 17.5399 25.8129C17.5606 25.7068 17.5814 25.603 17.6021 25.497C17.8673 24.1781 18.3492 22.9237 18.9856 21.7409C19.1424 21.448 19.2669 21.1529 19.3776 20.8416C19.5367 20.422 19.7119 20.0231 19.9171 19.6242C19.9771 19.5066 20.037 19.3867 20.0947 19.2668C20.7357 17.9755 21.5173 16.765 22.4235 15.6444L22.5296 15.513C22.7232 15.2709 22.9261 15.038 23.1337 14.8097C23.2213 14.7129 23.3043 14.616 23.3896 14.5192C23.551 14.3324 23.7239 14.1595 23.9015 13.9865C24.026 13.862 24.1528 13.7352 24.2773 13.6084C24.5656 13.3133 24.8561 13.032 25.1789 12.776C25.2826 12.6953 25.3772 12.61 25.474 12.5201C25.7853 12.2411 26.122 11.9967 26.454 11.7476L26.5439 11.6808C26.9244 11.3972 27.3117 11.1251 27.7083 10.8645C27.8029 10.8023 27.8974 10.74 27.9919 10.6778C28.0588 10.6363 28.1234 10.5924 28.1902 10.5486L28.2802 10.491C28.5292 10.3273 28.7897 10.1843 29.0526 10.046L29.131 10.0045C32.1907 8.38352 32.1907 8.38352 33.0785 8.38121Z"
              fill="#F9F6F6"
            />
          </g>
        </svg>
      </div>

      {/* Opciones del menú */}
      <div className="flex flex-col gap-6 items-center">
        {/* Dashboard */}
        <Link to="/operador">
          <div
            onClick={() => handleButtonClick && handleButtonClick("Dashboard")}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-[60px] h-[60px] bg-[#f1f2ff] rounded-[20px] border border-[#6A62DC] flex items-center justify-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 23 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.27378 5.49045H4.45525C3.70773 5.49045 2.99083 5.85197 2.46225 6.49548C1.93367 7.13899 1.63672 8.01177 1.63672 8.92183V29.5101C1.63672 30.4201 1.93367 31.2929 2.46225 31.9364C2.99083 32.5799 3.70773 32.9414 4.45525 32.9414H18.5479C19.2954 32.9414 20.0123 32.5799 20.5409 31.9364C21.0695 31.2929 21.3664 30.4201 21.3664 29.5101V8.92183C21.3664 8.01177 21.0695 7.13899 20.5409 6.49548C20.0123 5.85197 19.2954 5.49045 18.5479 5.49045H15.7294M7.27378 5.49045C7.27378 4.5804 7.57074 3.70761 8.09931 3.06411C8.62789 2.4206 9.3448 2.05908 10.0923 2.05908H12.9109C13.6584 2.05908 14.3753 2.4206 14.9039 3.06411C15.4324 3.70761 15.7294 4.5804 15.7294 5.49045M7.27378 5.49045C7.27378 6.40051 7.57074 7.27329 8.09931 7.9168C8.62789 8.56031 9.3448 8.92183 10.0923 8.92183H12.9109C13.6584 8.92183 14.3753 8.56031 14.9039 7.9168C15.4324 7.27329 15.7294 6.40051 15.7294 5.49045M9.04633 20.8725H14.6834M11.8649 17.4412V24.3039"
                  stroke="#6A62DC"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-white text-base font-bold mt-2">Dashboard</div>
          </div>
        </Link>

        {/* Asignar */}
        <Link to="/asignar">
          <div
            onClick={() => handleButtonClick && handleButtonClick("Asignar")}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-[60px] h-[60px] bg-[#f1f2ff] rounded-[20px] border border-[#6A62DC] flex items-center justify-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 30 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.89123 29.6817H5.41982C4.51283 29.6817 3.64298 29.3171 3.00164 28.6682C2.3603 28.0193 2 27.1392 2 26.2215V5.46021C2 4.5425 2.3603 3.66239 3.00164 3.01347C3.64298 2.36456 4.51283 2 5.41982 2H19.0991C20.0061 2 20.8759 2.36456 21.5173 3.01347C22.1586 3.66239 22.5189 4.5425 22.5189 5.46021V19.301M17.3892 27.9516L20.809 31.4118L27.6486 24.4913M8.83964 8.92042H15.6793M8.83964 15.8408H12.2595"
                  stroke="#6A62DC"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-white text-base font-bold mt-2">Asignar</div>
          </div>
        </Link>

        {/* Modificar */}
        <Link to="/modificar">
          <div
            onClick={() => handleButtonClick && handleButtonClick("Modificar")}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-[60px] h-[60px] bg-[#f1f2ff] rounded-[20px] border border-[#6A62DC] flex items-center justify-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 30 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.64226 8.92041H5.09484C4.27404 8.92041 3.48685 9.28497 2.90646 9.93389C2.32606 10.5828 2 11.4629 2 12.3806V27.9516C2 28.8693 2.32606 29.7494 2.90646 30.3983C3.48685 31.0472 4.27404 31.4118 5.09484 31.4118H19.0216C19.8424 31.4118 20.6296 31.0472 21.21 30.3983C21.7904 29.7494 22.1165 28.8693 22.1165 27.9516V26.2215M20.569 5.46021L25.2113 10.6505M27.3545 8.20261C27.9639 7.52121 28.3063 6.59704 28.3063 5.6334C28.3063 4.66976 27.9639 3.74559 27.3545 3.0642C26.745 2.3828 25.9184 2 25.0566 2C24.1947 2 23.3681 2.3828 22.7586 3.0642L9.7371 17.5711V22.7614H14.3794L27.3545 8.20261Z"
                  stroke="#6A62DC"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-white text-base font-bold mt-2">Modificar</div>
          </div>
        </Link>

        {/* Registrar */}
        <Link to="/registrar">
          <div
            onClick={() => handleButtonClick && handleButtonClick("Registrar")}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-[60px] h-[60px] bg-[#f1f2ff] rounded-[20px] border border-[#6A62DC] flex items-center justify-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.63707 5.43137H4.81853C4.07101 5.43137 3.35411 5.79289 2.82553 6.4364C2.29695 7.07991 2 7.95269 2 8.86275V29.451C2 30.361 2.29695 31.2338 2.82553 31.8773C3.35411 32.5208 4.07101 32.8824 4.81853 32.8824H18.9112C19.6587 32.8824 20.3756 32.5208 20.9042 31.8773C21.4328 31.2338 21.7297 30.361 21.7297 29.451V8.86275C21.7297 7.95269 21.4328 7.07991 20.9042 6.4364C20.3756 5.79289 19.6587 5.43137 18.9112 5.43137H16.0927M7.63707 5.43137C7.63707 4.52132 7.93402 3.64853 8.4626 3.00503C8.99117 2.36152 9.70808 2 10.4556 2H13.2741C14.0217 2 14.7386 2.36152 15.2671 3.00503C15.7957 3.64853 16.0927 4.52132 16.0927 5.43137M7.63707 5.43137C7.63707 6.34143 7.93402 7.21421 8.4626 7.85772C8.99117 8.50123 9.70808 8.86275 10.4556 8.86275H13.2741C14.0217 8.86275 14.7386 8.50123 15.2671 7.85772C15.7957 7.21421 16.0927 6.34143 16.0927 5.43137M9.04633 20.8725H14.6834M11.8649 17.4412V24.3039"
                  stroke="#6A62DC"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-white text-base font-bold mt-2">Registrar</div>
          </div>
        </Link>

        {/* Incidencias */}
        <Link to="/incidencias">
          <div
            onClick={() =>
              handleButtonClick && handleButtonClick("Incidencias")
            }
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-[60px] h-[60px] bg-[#f1f2ff] rounded-[20px] border border-[#6A62DC] flex items-center justify-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 32 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.76216 25.3193C4.76216 26.3501 5.05317 27.3387 5.57118 28.0675C6.08919 28.7964 6.79175 29 7.52432 29C8.2569 29 8.95946 28.7964 9.47747 28.0675C9.99547 27.3387 10.2865 26.3501 10.2865 25.3193M4.76216 25.3193C4.76216 24.2885 5.05317 23.3 5.57118 22.5711C6.08919 21.8422 6.79175 21.4328 7.52432 21.4328C8.2569 21.4328 8.95946 21.8422 9.47747 22.5711C9.99547 23.3 10.2865 24.2885 10.2865 25.3193M4.76216 25.3193H2V3.94328C2 3.42789 2.14551 2.93361 2.40451 2.56917C2.66351 2.20474 3.0148 2 3.38108 2H22.7162C24.5476 2 26.3041 3.43316 27.5991 5.98421C28.8941 8.53526 29.6216 11.9952 29.6216 15.6029M10.2865 25.3193H21.3351M21.3351 25.3193C21.3351 26.3501 21.6261 27.3387 22.1442 28.0675C22.6622 28.7964 23.3647 29 24.0973 29C24.8299 29 25.5324 28.7964 26.0504 28.0675C26.5684 27.3387 26.8595 26.3501 26.8595 25.3193M21.3351 25.3193C21.3351 24.2885 21.6261 23.3 22.1442 22.5711C22.6622 21.8422 23.3647 21.4328 24.0973 21.4328C24.8299 21.4328 25.5324 21.8422 26.0504 22.5711C26.5684 23.3 26.8595 24.2885 26.8595 25.3193M26.8595 25.3193H29.6216V15.6029M29.6216 15.6029H23.4068L21.3351 2M2 11.7164H22.7162M8.90541 2V11.7164M15.8108 2V11.7164"
                  stroke="#6A62DC"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-white text-base font-bold mt-2">
              Incidencias
            </div>
          </div>
        </Link>

        {/* Reportes */}
        <Link to="/reportes">
          <div
            onClick={() => handleButtonClick && handleButtonClick("Reportes")}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-[60px] h-[60px] bg-[#f1f2ff] rounded-[20px] border border-[#6A62DC] flex items-center justify-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 36 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0031 7.18519H6.50154C5.30766 7.18519 4.16267 7.73148 3.31847 8.70389C2.47427 9.6763 2 10.9952 2 12.3704V43.4815C2 44.8567 2.47427 46.1756 3.31847 47.148C4.16267 48.1204 5.30766 48.6667 6.50154 48.6667H29.0092C30.2031 48.6667 31.3481 48.1204 32.1923 47.148C33.0365 46.1756 33.5108 44.8567 33.5108 43.4815V12.3704C33.5108 10.9952 33.0365 9.6763 32.1923 8.70389C31.3481 7.73148 30.2031 7.18519 29.0092 7.18519H24.5077M11.0031 7.18519C11.0031 5.80999 11.4774 4.49112 12.3216 3.51871C13.1658 2.54629 14.3107 2 15.5046 2H20.0062C21.2 2 22.345 2.54629 23.1892 3.51871C24.0334 4.49112 24.5077 5.80999 24.5077 7.18519M11.0031 7.18519C11.0031 8.56038 11.4774 9.87925 12.3216 10.8517C13.1658 11.8241 14.3107 12.3704 15.5046 12.3704H20.0062C21.2 12.3704 22.345 11.8241 23.1892 10.8517C24.0334 9.87925 24.5077 8.56038 24.5077 7.18519M9.04633 20.8725H14.6834M11.8649 17.4412V24.3039"
                  stroke="#6A62DC"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-white text-base font-bold mt-2">Reportes</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
