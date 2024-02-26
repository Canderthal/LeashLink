import {
  Container,
  Col,
  Row,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getDocs, collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import db from "../firebase";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import ClientMap from "../components/ClientMap";
import ClientDetails from "../components/ClientDetails";
import PrivateTrainingForm from "../Forms/PrivateTraining";
import ServiceSelection from "../components/ServiceSelection";
import TrainingClasses from "../components/dogTrainingClass";

export const Dashboard = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [content, setActiveContent] = useState(null); // use default dash unless client details are viewed
  const [index, setIndex] = useState("");
  const [loading, setLoading] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576); // Define breakpoint as 576px
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setLoading(true);
        const userEmail = currentUser.email; // Use email as a unique identifier
        try {
          const userDocRef = collection(db, "users");
          const querySnapshot = await getDocs(
            query(userDocRef, where("email", "==", userEmail))
          );

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const userRoleFromFirestore = userData.role;
            setUserRole(userRoleFromFirestore);

            setLoading(false);
          } else {
            setUserRole(null);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole(null);
          setLoading(false);
        }
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleContentSwitch = (content) => {
    setActiveContent(content);
    console.log("active content: ", content);
  };

  const handleSelectClient = (client, dogIndex) => {
    setSelectedClient(client);
    setIndex(parseInt(dogIndex));
    setActiveContent("SelectedClient");
  };
  const handleResetContent = () => {
    setActiveContent(null);
  };

  return (
    <>
      <Container className="mt-3">
        {content ? (
          <>
            <TrainingClasses
              className="classDisplay"
              classType={content}
              handleContentSwitch={handleContentSwitch}
            />
          </>
        ) : (
          <ServiceSelection handleContentSwitch={handleContentSwitch} />
        )}
      </Container>
    </>
  );
};

export default Dashboard;
