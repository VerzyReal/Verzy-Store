"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  UserCheck,
  UserX,
  Trash2,
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchUsersAndRoles = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/roles"),
      ]);
      const usersData = await usersRes.json();
      const rolesData = await rolesRes.json();

      if (usersData.users) setUsers(usersData.users);
      if (rolesData.roles) setRoles(rolesData.roles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndRoles();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setActionLoading(userId);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role_id: newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengubah role");

      setFeedback({ type: "success", text: "Role user berhasil diperbarui" });
      await fetchUsersAndRoles();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    setActionLoading(userId);
    setFeedback(null);
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengubah status");

      setFeedback({
        type: "success",
        text: `User berhasil ${newStatus === "active" ? "diaktifkan" : "dinonaktifkan"}`,
      });
      await fetchUsersAndRoles();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus user "${userName}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    setActionLoading(userId);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus user");

      setFeedback({ type: "success", text: `User ${userName} berhasil dihapus` });
      await fetchUsersAndRoles();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Title & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-white">
            Manajemen Pengguna
          </h1>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 mt-0.5">
            Kelola daftar akun, status aktif/nonaktif, serta hak akses role pengguna.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-on-surface-variant dark:text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
          />
        </div>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300"
              : "bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-500/40 text-red-800 dark:text-red-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Users Table Card */}
      <div className="bg-white dark:bg-[#121929] rounded-3xl border border-surface-container-high dark:border-cyan-500/20 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-on-surface-variant dark:text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-primary-container dark:text-cyan-400" />
            <span className="text-xs">Memuat data pengguna...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-xs text-on-surface-variant dark:text-slate-400">
            Tidak ada pengguna ditemukan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container-high dark:border-cyan-500/20 bg-surface-low/50 dark:bg-[#0f1422]/70 text-[11px] font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Nama &amp; Email</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/60 dark:divide-cyan-500/15 text-xs sm:text-sm">
                {filteredUsers.map((user) => {
                  const isBusy = actionLoading === user.id;
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-surface-low/40 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-headline font-bold text-on-surface dark:text-white">
                            {user.name}
                          </span>
                          <span className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                            {user.email}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-primary-container dark:text-cyan-400" />
                          <select
                            disabled={isBusy}
                            value={user.role_id}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary-container dark:focus:ring-cyan-400"
                          >
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                            {roles
                              .filter((r) => r.name !== "admin" && r.name !== "user")
                              .map((r) => (
                                <option key={r.id} value={r.name}>
                                  {r.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <button
                          disabled={isBusy}
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            user.status === "active"
                              ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {user.status === "active" ? (
                            <>
                              <UserCheck className="w-3 h-3 text-emerald-600" />
                              <span>Aktif</span>
                            </>
                          ) : (
                            <>
                              <UserX className="w-3 h-3 text-slate-500" />
                              <span>Nonaktif</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          disabled={isBusy}
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="p-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors disabled:opacity-50"
                          title="Hapus Pengguna"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
