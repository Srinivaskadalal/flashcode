"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getLoggedInUser, updateUserProfile } from "@/lib/client/userClient";

const EditProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    portfolio: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getLoggedInUser();
      console.log("🧠 User fetched:", res);

      if (res?.success && res.data) {
        setUserData({
          name: res.data.name || "",
          username: res.data.username || "",
          bio: res.data.bio || "",
          location: res.data.location || "",
          portfolio: res.data.portfolio || "",
        });
      } else {
        console.error("⚠️ Could not load user profile:", res?.error);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateUserProfile(userData);

    if (res?.success) {
      router.push(`/profile/${res.data._id}`);
    } else {
      alert("❌ Update failed: " + res?.error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-white">Edit Your Profile</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="We don't have any info about your name"
        />
        <Input
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="We don't have any info about your username"
        />
        <Textarea
          name="bio"
          value={userData.bio}
          onChange={handleChange}
          placeholder="We don't have any info about your bio"
        />
        <Input
          name="location"
          value={userData.location}
          onChange={handleChange}
          placeholder="We don't have any info about your location"
        />
        <Input
          name="portfolio"
          value={userData.portfolio}
          onChange={handleChange}
          placeholder="We don't have any info about your portfolio"
        />
        <Button
          type="submit"
          className="primary-gradient2 dark:text-white text-white font-semibold "
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditProfilePage;